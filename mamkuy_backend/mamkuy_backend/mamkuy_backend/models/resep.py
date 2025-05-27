from sqlalchemy import (
    Column,
    Integer,
    Text,
)
from sqlalchemy.ext.declarative import declarative_base

# Impor Base dari meta.py (pastikan path ini benar)
from .meta import Base

class Resep(Base):
    """
    Model SQLAlchemy untuk entitas Resep.
    """
    __tablename__ = 'reseps'  # Nama tabel di database

    id = Column(Integer, primary_key=True) # Kolom ID sebagai primary key
    nama_resep = Column(Text, nullable=False) # Nama resep, tidak boleh null
    bahan = Column(Text, nullable=False) # Bahan-bahan, tidak boleh null
    langkah_memasak = Column(Text, nullable=False) # Langkah-langkah memasak, tidak boleh null
    gambar = Column(Text, nullable=True) # URL atau path gambar, boleh null

    def __json__(self, request):
        """
        Metode ini mendefinisikan bagaimana objek Resep akan diserialisasi menjadi JSON.
        Ini penting untuk RESTful API Anda.
        """
        return {
            'id': self.id,
            'nama_resep': self.nama_resep,
            'bahan': self.bahan,
            'langkah_memasak': self.langkah_memasak,
            'gambar': self.gambar,
        }

    def __init__(self, nama_resep, bahan, langkah_memasak, gambar=None):
        """
        Konstruktor untuk membuat objek Resep baru.
        """
        self.nama_resep = nama_resep
        self.bahan = bahan
        self.langkah_memasak = langkah_memasak
        self.gambar = gambar

    def __repr__(self):
        """
        Representasi string dari objek Resep, berguna untuk debugging.
        """
        return f"<Resep(id={self.id}, nama_resep='{self.nama_resep}')>"