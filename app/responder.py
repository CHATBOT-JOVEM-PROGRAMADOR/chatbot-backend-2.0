import google.generativeai as genai
import os
from dotenv import load_dotenv
from app.crawler import obter_conteudo_site

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# Substitua pela sua chave da API Gemini, obtida do ambiente
GEMINI_API_KEY = "API-KEY-AQUI"

if not GEMINI_API_KEY:
    raise ValueError("A variável de ambiente 'GEMINI_API_KEY' não está configurada.")

genai.configure(api_key=GEMINI_API_KEY)
model_name = "gemini-1.5-flash-latest"
model = genai.GenerativeModel(model_name)

def responder_com_base_site_arquivo(pergunta: str, url: str, caminho_arquivo: str = "content.txt") -> str:
    """
    Busca o texto do site e do arquivo, monta um prompt e usa a Gemini 1.5 Flash para responder.
    """
    
    # Define um limite de caracteres maior para aproveitar o grande contexto do Gemini 1.5 Flash
    MAX_CHARS_FOR_CONTEXT = 20000 

    # Busca conteúdo do site
    texto_site = obter_conteudo_site(url)
    if not texto_site:
        texto_site = "Não foi possível extrair informações do site."
    texto_site_limitado = texto_site[:MAX_CHARS_FOR_CONTEXT]

    # Busca conteúdo do arquivo
    try:
        with open(caminho_arquivo, "r", encoding="utf-8") as f:
            texto_arquivo = f.read()
        print("Conteúdo lido do arquivo:", texto_arquivo[:200] + "...")
    except FileNotFoundError:
        texto_arquivo = "O arquivo não foi encontrado."
    except Exception as e:
        texto_arquivo = f"Erro ao ler o arquivo: {e}"
        
    texto_arquivo_limitado = texto_arquivo[:MAX_CHARS_FOR_CONTEXT]

    # Monta o prompt unindo as duas fontes
    prompt_template = (
        f"- Você é um assistente virtual brasileiro especializado em responder perguntas sobre o Programa Jovem Programador.\n"
        f"- Sua tarefa é analisar o 'Conteúdo do site' e o 'Conteúdo do arquivo' abaixo para responder à 'Pergunta do usuário'.\n"
        f"- Siga estas regras estritamente:\n"
        f"- Responda de forma clara, concisa, objetiva e em português do Brasil.\n"
        f"- Dê respostas curtas e diretas, evitando explicações longas ou complexas.\n"
        f"- Use APENAS as informações presentes no 'Conteúdo do site' e no 'Conteúdo do arquivo'. Não adicione conhecimento externo.\n"
        f"- Se a pergunta for uma saudação (ex: 'oi', 'olá', 'tudo bem?'), responda com uma saudação amigável.\n"
        f"- Se a pergunta NÃO puder ser respondida com as informações fornecidas, diga: 'Desculpe, não tenho informações suficientes para responder a essa pergunta com base nos dados fornecidos.'\n"
        f"- Seja educado e profissional em suas interações.\n"
        f"- Limite sua resposta a 200 tokens para manter a brevidade.\n"
        f"- Se a data dos eventos for no passado, use o tempo verbal passado. Se for no futuro, use o tempo verbal futuro.\n"
        f"- Sempre termine com uma pergunta amigável como 'Posso ajudar com mais alguma coisa?' ou similar.\n"
        
        f"--- Conteúdo do Site ({url}) ---\n"
        f"{texto_site_limitado}\n"
        f"-------------------------------\n\n"
        
        f"--- Conteúdo do Arquivo ({caminho_arquivo}) ---\n"
        f"{texto_arquivo_limitado}\n"
        f"-------------------------------\n\n"
        
        f"--- Pergunta do Usuário ---\n"
        f"{pergunta}\n"
        f"---------------------------\n\n"
        
        f"Resposta:\n"
    )

    try:
        # Verifica se a pergunta é uma saudação
        saudacoes = ["oi", "olá", "oi, tudo bem?", "olá, tudo bem?", "oi, tudo bem com você?", "tudo bem?", "hello", "hi", "hola"]
        if pergunta.lower().strip() in saudacoes:
            return "Olá! Sou o assistente do Programa Jovem Programador. Como posso ajudar você hoje?"

        response = model.generate_content(prompt_template)
        return response.text.strip()
        
    except Exception as e:
        print(f"Erro ao processar solicitação: {e}")
        return f"Ocorreu um erro ao processar sua solicitação. Tente novamente em alguns instantes."