from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import tempfile
import shutil
from dotenv import load_dotenv

# LangChain imports
from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader, TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_openai import AzureOpenAIEmbeddings, AzureChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain

# Load environment variables
load_dotenv()

app = FastAPI(title="RAG API", description="Document Q&A API using RAG")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*",
        "http://localhost:5173",
        "https://localhost:5173",
        "https://slashbyte.org",
        "https://www.slashbyte.org"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables to store the RAG chain
rag_chain = None
current_document = None

# Pydantic models
class QuestionRequest(BaseModel):
    question: str

class QuestionResponse(BaseModel):
    answer: str
    success: bool
    error: str = None

# Azure OpenAI configuration
AZURE_ENDPOINT = os.getenv("endpoint")
AZURE_KEY = os.getenv("subscription_key")
AZURE_CHAT_API_VER = os.getenv("api_version")
AZURE_EMB_API_VER = os.getenv("embedding_api_version")
DEPLOYMENT_CHAT = os.getenv("deployment")
DEPLOYMENT_EMBEDDING = os.getenv("embedding_deployment", "text-embedding-ada-002")

def load_document(file_path: str):
    """Load a document based on its file extension"""
    ext = os.path.splitext(file_path)[1].lower()
    
    try:
        if ext == ".pdf":
            return PyPDFLoader(file_path).load()
        elif ext in [".docx", ".doc"]:
            return Docx2txtLoader(file_path).load()
        elif ext == ".txt":
            return TextLoader(file_path, encoding="utf-8").load()
        else:
            # Try as text file
            return TextLoader(file_path, encoding="utf-8").load()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error loading document: {str(e)}")

def setup_rag_chain(documents):
    """Set up the RAG chain with the provided documents"""
    global rag_chain
    
    try:
        # Split documents into chunks
        text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        chunks = text_splitter.split_documents(documents)
        
        # Create embeddings
        embeddings = AzureOpenAIEmbeddings(
            deployment=DEPLOYMENT_EMBEDDING,
            model=DEPLOYMENT_EMBEDDING,
            azure_endpoint=AZURE_ENDPOINT,
            api_key=AZURE_KEY,
            api_version=AZURE_EMB_API_VER,
        )
        
        # Create vector store
        vectorstore = FAISS.from_documents(chunks, embeddings)
        
        # Set up chat model
        llm = AzureChatOpenAI(
            deployment_name=DEPLOYMENT_CHAT,
            model_name=DEPLOYMENT_CHAT,
            azure_endpoint=AZURE_ENDPOINT,
            api_key=AZURE_KEY,
            api_version=AZURE_CHAT_API_VER,
            temperature=1.0,
        )
        
        # Create memory and chain
        memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
        rag_chain = ConversationalRetrievalChain.from_llm(
            llm=llm,
            retriever=vectorstore.as_retriever(),
            memory=memory,
            chain_type="stuff",
        )
        
        return True
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error setting up RAG chain: {str(e)}")

@app.get("/")
async def root():
    return {"message": "RAG API is running"}

@app.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    """Upload and process a document"""
    global current_document
    
    # Check file type
    allowed_extensions = ['.pdf', '.docx', '.doc', '.txt']
    file_ext = os.path.splitext(file.filename)[1].lower()
    
    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=400, 
            detail=f"Unsupported file type. Allowed: {', '.join(allowed_extensions)}"
        )

    tmp_file_path = None
    try:
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=file_ext) as tmp_file:
            content = await file.read()
            tmp_file.write(content)
            tmp_file_path = tmp_file.name
        
        # Load the document
        documents = load_document(tmp_file_path)

        if not documents:
          raise HTTPException(status_code=400, detail="No content found in the document")
        
        # Set up RAG chain
        setup_rag_chain(documents)
        
        # Clean up temporary file
        os.unlink(tmp_file_path)
        
        current_document = file.filename
        
        return {
            "message": f"Document '{file.filename}' uploaded and processed successfully",
            "filename": file.filename,
            "chunks": len(documents),
            "success": True
        }
        
    except Exception as e:
        # Clean up temporary file if it exists
        if 'tmp_file_path' in locals():
            try:
                os.unlink(tmp_file_path)
            except:
                pass
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ask", response_model=QuestionResponse)
async def ask_question(request: QuestionRequest):
    """Ask a question about the uploaded document"""
    global rag_chain
    
    if rag_chain is None:
        raise HTTPException(status_code=400, detail="No document uploaded. Please upload a document first.")
    
    try:
        result = rag_chain.invoke({"question": request.question})
        return QuestionResponse(
            answer=result["answer"],
            success=True
        )
    except Exception as e:
        return QuestionResponse(
            answer="",
            success=False,
            error=str(e)
        )

@app.get("/status")
async def get_status():
    """Get the current status of the RAG system"""
    return {
        "rag_ready": rag_chain is not None,
        "current_document": current_document,
        "azure_endpoint": AZURE_ENDPOINT is not None,
        "deployment": DEPLOYMENT_CHAT
    }
  
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "RAG API"}

# Error handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return {
        "error": True,
        "message": exc.detail,
        "status_code": exc.status_code
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(api, host="0.0.0.0", port=8000)