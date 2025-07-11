import argparse
import os
from dotenv import load_dotenv

# LangChain and Azure imports
from langchain_community.document_loaders import TextLoader, DirectoryLoader
from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_openai import AzureOpenAIEmbeddings, AzureChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain

# --- 1) Parse CLI args ---
parser = argparse.ArgumentParser(description="Run a RAG pipeline against documents.")
parser.add_argument(
    "source", help="Path to a document file or directory of documents"
)
parser.add_argument(
    "--question", "-q",
    help="The question to ask the RAG system. If omitted, enters interactive mode.")
args = parser.parse_args()

# Load environment variables
load_dotenv()

# Fixed environment variable loading
AZURE_ENDPOINT       = os.getenv("endpoint")
AZURE_KEY            = os.getenv("subscription_key")
AZURE_CHAT_API_VER   = os.getenv("api_version")
AZURE_EMB_API_VER    = os.getenv("embedding_api_version")
DEPLOYMENT_CHAT      = os.getenv("deployment")
DEPLOYMENT_EMBEDDING = os.getenv("embedding_deployment", "text-embedding-ada-002")

# Debug: Print loaded values (remove in production)
print(f"Endpoint: {AZURE_ENDPOINT}")
print(f"API Version: {AZURE_CHAT_API_VER}")
print(f"Deployment: {DEPLOYMENT_CHAT}")
print(f"Embedding Deployment: {DEPLOYMENT_EMBEDDING}")

# Validate required environment variables
if not all([AZURE_ENDPOINT, AZURE_KEY, AZURE_CHAT_API_VER, DEPLOYMENT_CHAT]):
    raise ValueError("Missing required environment variables. Check your .env file.")

# --- 2) Load documents based on path ---
def load_documents(path: str):
    """
    Recursively load documents from a file or directory. Supports .txt, .pdf, .docx/.doc.
    """
    docs = []
    if os.path.isdir(path):
        for root, _, files in os.walk(path):
            for fname in files:
                fpath = os.path.join(root, fname)
                docs.extend(load_documents(fpath))
        return docs
    elif os.path.isfile(path):
        ext = os.path.splitext(path)[1].lower()
        try:
            if ext in [".pdf"]:
                print(f"Loading PDF: {path}")
                return PyPDFLoader(path).load()
            elif ext in [".docx", ".doc"]:
                print(f"Loading Word document: {path}")
                return Docx2txtLoader(path).load()
            elif ext in [".txt"]:
                print(f"Loading text file: {path}")
                return TextLoader(path, encoding="utf-8").load()
            else:
                print(f"Unsupported file type: {ext}. Trying as text file.")
                return TextLoader(path, encoding="utf-8").load()
        except Exception as e:
            print(f"Error loading {path}: {e}")
            return []
    else:
        raise FileNotFoundError(f"Source not found: {path}")

# Load and process documents
print(f"Loading documents from: {args.source}")
docs = load_documents(args.source)
if not docs:
    raise RuntimeError(f"No documents found at {args.source}")

print(f"Loaded {len(docs)} documents")

# --- 3) Chunk documents ---
print("Splitting documents into chunks...")
splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
chunks   = splitter.split_documents(docs)
print(f"Created {len(chunks)} chunks")

# --- 4) Create embeddings and vectorstore ---
print("Creating embeddings...")
try:
    embeddings = AzureOpenAIEmbeddings(
        deployment         = DEPLOYMENT_EMBEDDING,
        model              = DEPLOYMENT_EMBEDDING,
        azure_endpoint     = AZURE_ENDPOINT,
        api_key            = AZURE_KEY,
        api_version        = AZURE_EMB_API_VER,
    )
    print("Creating vector store...")
    vectorstore = FAISS.from_documents(chunks, embeddings)
    print("Vector store created successfully")
except Exception as e:
    print(f"Error creating embeddings/vectorstore: {e}")
    raise

# --- 5) Set up chat LLM and RAG chain ---
print("Setting up chat model...")
try:
    llm = AzureChatOpenAI(
        deployment_name    = DEPLOYMENT_CHAT,
        model_name         = DEPLOYMENT_CHAT,
        azure_endpoint     = AZURE_ENDPOINT,
        api_key            = AZURE_KEY,
        api_version        = AZURE_CHAT_API_VER,
        temperature        = 0.7,
    )
    
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    chain  = ConversationalRetrievalChain.from_llm(
        llm        = llm,
        retriever  = vectorstore.as_retriever(),
        memory     = memory,
        chain_type = "stuff",
    )
    print("RAG chain setup complete")
except Exception as e:
    print(f"Error setting up chat model: {e}")
    raise

# --- 6) Run query or interactive loop ---
def ask(question: str):
    try:
        print(f"Processing question: {question}")
        res = chain.invoke({"question": question})
        print(f"Q: {question}")
        print(f"A: {res['answer']}")
        print("-" * 50)
        return res['answer']
    except Exception as e:
        print(f"Error processing question: {e}")
        return f"Error: {e}"

if args.question:
    ask(args.question)
else:
    print("\n" + "="*50)
    print("RAG System Ready!")
    print("Entering interactive Q&A (type 'exit' or Ctrl-C to quit)")
    print("="*50)
    while True:
        try:
            q = input("\nYour question: ")
            if q.lower() in ('exit','quit'):
                break
            if q.strip():
                ask(q)
        except KeyboardInterrupt:
            print("\nGoodbye!")
            break
        except Exception as e:
            print(f"Error: {e}")