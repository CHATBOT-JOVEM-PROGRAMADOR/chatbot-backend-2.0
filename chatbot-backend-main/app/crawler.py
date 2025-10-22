import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

def obter_conteudo_site(url, max_paginas=10):
    visitados = set()
    textos = []

    def crawl(url):
        if url in visitados or len(visitados) >= max_paginas:
            return
        visitados.add(url)
        try:
            resp = requests.get(url, timeout=10)
            soup = BeautifulSoup(resp.text, 'html.parser')
            textos.append(' '.join(soup.stripped_strings))
            for a in soup.find_all('a', href=True):
                link = urljoin(url, a['href'])
                if urlparse(link).netloc == urlparse(url).netloc:
                    crawl(link)
        except Exception:
            pass

    crawl(url)
    return '\n'.join(textos)