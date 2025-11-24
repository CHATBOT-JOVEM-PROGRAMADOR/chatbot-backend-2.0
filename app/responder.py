import os
from dotenv import load_dotenv
import google.generativeai as genai
from app.crawler import obter_conteudo_site
from app.database import SessionLocal
from app.models import Fonte
from datetime import datetime
from functools import partial  # Para evitar lambda com argumentos

# Carrega as variáveis de ambiente
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("A variável de ambiente 'GEMINI_API_KEY' não está configurada.")

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.0-flash")


db = SessionLocal()


def get_ou_salvar_conteudo(tipo: str, origem: str, leitura_funcao) -> str:
    """
    Busca o conteúdo no banco. Se não houver, executa a função fornecida, salva o resultado e retorna.
    """
    fonte = db.query(Fonte).filter_by(origem=origem).first()
    if fonte:
        return fonte.conteudo
    conteudo = leitura_funcao()
    nova_fonte = Fonte(tipo=tipo, origem=origem, conteudo=conteudo, atualizado_em=datetime.utcnow())
    db.add(nova_fonte)
    db.commit()
    return conteudo


# Funções específicas para ler conteúdo
def ler_conteudo_site(url: str) -> str:
    return obter_conteudo_site(url)


def ler_conteudo_arquivo(caminho: str) -> str:
    try:
        with open(caminho, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        return "O arquivo não foi encontrado."
    except Exception as e:
        return f"Erro ao ler o arquivo: {e}"


def responder_com_base_site_arquivo(pergunta: str, url: str, caminho_arquivo: str = "content.txt") -> str:
    MAX_CHARS = 200000

    # Usando partial para "pré-configurar" a função sem lambda
    leitura_site_func = partial(ler_conteudo_site, url)
    leitura_arquivo_func = partial(ler_conteudo_arquivo, caminho_arquivo)

    texto_site = get_ou_salvar_conteudo("site", url, leitura_site_func)
    texto_arquivo = get_ou_salvar_conteudo("arquivo", caminho_arquivo, leitura_arquivo_func)

    prompt = (

        f"--- Conteúdo do Site ({url}) ---\n{texto_site[:MAX_CHARS]}\n"
        f"--- Conteúdo do Arquivo ({caminho_arquivo}) ---\n{texto_arquivo[:MAX_CHARS]}\n"
        f"--- Pergunta do Usuário ---\n{pergunta}\nResposta:\n"

        f"--- Se o usuario falar algo sobre se machucar fisicamente, diga que ele deve buscar ajuda CVV (Centro de Valorização da Vida) pelo telefone 188 ou pelo site cvv.org.br.\n"
        f"--- Você é um assistente virtual brasileiro especializado em responder perguntas com base em informações fornecidas.\n"
        f"--- Responda de forma clara, objetiva e em português do Brasil.\n"
        f"--- Use APENAS as informações presentes no 'Conteúdo do site' e no 'Conteúdo do arquivo'.\n"
        f"--- Fale no formato temporal, dependendo da data das informações. \n"
        f"--- Limite sua resposta a 100 tokens.\n"

    )

    try:
        if pergunta.lower().strip() in ["oi", "olá", "ola", "tudo bem?"]:
            return "Olá! Como posso ajudar?"

        resposta = model.generate_content(prompt)
        return f"{resposta.text.strip()} Posso ajudar com mais alguma coisa?"

    except Exception as e:
        return f"Ocorreu um erro ao processar: {e}"

