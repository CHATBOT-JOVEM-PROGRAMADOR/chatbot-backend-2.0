from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Fonte(Base):
    __tablename__ = 'fontes'
    id = Column(Integer, primary_key=True)
    tipo = Column(String)  # 'site' ou 'arquivo'
    origem = Column(String, unique=True)  # URL ou caminho
    conteudo = Column(Text)
    atualizado_em = Column(DateTime, default=datetime.utcnow)
