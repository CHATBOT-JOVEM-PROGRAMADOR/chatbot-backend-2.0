# É o ponto de entrada da aplicação Flask. 
# Inicializa o servidor web, carrega o blueprint da API
# Define a rota principal para a interface web.
# Cria uma aplicação Flask

from flask import Flask, render_template  # Importa o Flask (framework web) e o render_template (para carregar páginas HTML).
from app.api import chatbot_api           # Importa o "blueprint" da API do chatbot (um módulo separado que organiza as rotas da API).
from flask_cors import CORS



app = Flask(__name__, static_folder='static', template_folder='templates')                     # Cria a aplicação Flask.
app.register_blueprint(chatbot_api)       # Registra o blueprint do chatbot na aplicação principal. Isso ativa as rotas da API.
CORS(app)
@app.route("/")
def index():
    return render_template("index.html")  # Define a rota principal ("/") da página. Quando alguém acessar o site, ele carrega o arquivo

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)                   # Inicia o servidor Flask localmente com o modo debug ativado (útil para testes).

#É o ponto de entrada da aplicação Flask. 
#Inicializa o servidor web, carrega o blueprint da API
#e define a rota principal para a interface web.


