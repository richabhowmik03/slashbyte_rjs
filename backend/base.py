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
AZURE_ENDPOINT       = os.getenv("endpoint").rstrip("/")
AZURE_KEY            = os.getenv("subscription_key")
AZURE_CHAT_API_VER   = os.getenv("api_version")
AZURE_EMB_API_VER    = os.getenv("embedding_api_version")
DEPLOYMENT_CHAT      = os.getenv("deployment")
DEPLOYMENT_EMBEDDING = os.getenv("embedding_deployment", "text-embedding-ada-002")

# --- 2) Load documents based on path ---
def load_documents(path: str):
    """
    Recursively load documents from a file or directory. Supports .txt, .pdf, .docx/.doc via UnstructuredWordDocumentLoader.
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
                return PyPDFLoader(path).load()
            elif ext in [".docx", ".doc"]:
                return Docx2txtLoader(path).load()
            else:
                return TextLoader(path, encoding="utf-8").load()
        except Exception as e:
            raise RuntimeError(f"Error loading {path}: {e}")
    else:
        raise FileNotFoundError(f"Source not found: {path}")

# Load and process documents
docs = load_documents(args.source)
if not docs:
    raise RuntimeError(f"No documents found at {args.source}")

# --- 3) Chunk documents ---
splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
chunks   = splitter.split_documents(docs)

# --- 4) Create embeddings and vectorstore ---
embeddings = AzureOpenAIEmbeddings(
    deployment         = DEPLOYMENT_EMBEDDING,
    model              = DEPLOYMENT_EMBEDDING,
    openai_api_type    = "azure",
    azure_endpoint     = AZURE_ENDPOINT,
    openai_api_key     = AZURE_KEY,
    openai_api_version = AZURE_EMB_API_VER,
)
vectorstore = FAISS.from_documents(chunks, embeddings)

# --- 5) Set up chat LLM and RAG chain ---
llm = AzureChatOpenAI(
    deployment_name    = DEPLOYMENT_CHAT,
    model_name         = DEPLOYMENT_CHAT,
    azure_endpoint     = AZURE_ENDPOINT,
    openai_api_key     = AZURE_KEY,
    openai_api_version = AZURE_CHAT_API_VER,
    temperature        = 1.0,
)
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
chain  = ConversationalRetrievalChain.from_llm(
    llm        = llm,
    retriever  = vectorstore.as_retriever(),
    memory     = memory,
    chain_type = "stuff",
)

# --- 6) Run query or interactive loop ---
def ask(question: str):
    res = chain.invoke({"question": question})
    print(f"Q: {question}\nA: {res['answer']}\n")

if args.question:
    ask(args.question)
else:
    print("Entering interactive Q&A (type 'exit' or Ctrl-C to quit)")
    while True:
        q = input("Your question: ")
        if q.lower() in ('exit','quit'):
            break
        ask(q)
