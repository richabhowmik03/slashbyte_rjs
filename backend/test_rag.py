#!/usr/bin/env python3
"""
Simple test script to verify RAG system is working
"""
import os
import sys
from dotenv import load_dotenv

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def test_environment():
    """Test if environment variables are loaded correctly"""
    load_dotenv()
    
    required_vars = [
        "endpoint",
        "subscription_key", 
        "api_version",
        "deployment"
    ]
    
    print("Testing environment variables...")
    for var in required_vars:
        value = os.getenv(var)
        if value:
            print(f"✓ {var}: {value[:20]}..." if len(value) > 20 else f"✓ {var}: {value}")
        else:
            print(f"✗ {var}: Not found")
    
    return all(os.getenv(var) for var in required_vars)

def test_azure_connection():
    """Test Azure OpenAI connection"""
    try:
        from langchain_openai import AzureChatOpenAI
        
        load_dotenv()
        
        llm = AzureChatOpenAI(
            deployment_name=os.getenv("deployment"),
            model_name=os.getenv("deployment"),
            azure_endpoint=os.getenv("endpoint"),
            api_key=os.getenv("subscription_key"),
            api_version=os.getenv("api_version"),
            temperature=0.7,
        )
        
        # Test with a simple question
        response = llm.invoke("Hello, can you respond with 'Connection successful'?")
        print(f"✓ Azure OpenAI connection successful: {response.content}")
        return True
        
    except Exception as e:
        print(f"✗ Azure OpenAI connection failed: {e}")
        return False

def test_embeddings():
    """Test Azure OpenAI embeddings"""
    try:
        from langchain_openai import AzureOpenAIEmbeddings
        
        load_dotenv()
        
        embeddings = AzureOpenAIEmbeddings(
            deployment=os.getenv("embedding_deployment", "text-embedding-ada-002"),
            model=os.getenv("embedding_deployment", "text-embedding-ada-002"),
            azure_endpoint=os.getenv("endpoint"),
            api_key=os.getenv("subscription_key"),
            api_version=os.getenv("embedding_api_version"),
        )
        
        # Test embedding
        test_text = "This is a test document for embedding."
        result = embeddings.embed_query(test_text)
        print(f"✓ Embeddings working: Generated {len(result)} dimensions")
        return True
        
    except Exception as e:
        print(f"✗ Embeddings failed: {e}")
        return False

if __name__ == "__main__":
    print("RAG System Test")
    print("=" * 50)
    
    # Test environment
    env_ok = test_environment()
    print()
    
    if not env_ok:
        print("❌ Environment variables not properly configured")
        sys.exit(1)
    
    # Test Azure connection
    connection_ok = test_azure_connection()
    print()
    
    # Test embeddings
    embeddings_ok = test_embeddings()
    print()
    
    if connection_ok and embeddings_ok:
        print("✅ All tests passed! RAG system should work correctly.")
    else:
        print("❌ Some tests failed. Check your configuration.")