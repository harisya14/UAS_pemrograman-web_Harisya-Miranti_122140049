# mamkuy_backend/models/resep.py
from sqlalchemy import Column, Integer, Text
from sqlalchemy.orm import relationship
from .meta import Base

class Resep(Base):
    __tablename__ = 'reseps'

    id = Column(Integer, primary_key=True)
    nama_resep = Column(Text, nullable=False)
    bahan = Column(Text, nullable=False)
    langkah_memasak = Column(Text, nullable=False)
    gambar = Column(Text, nullable=True)

    menu_makans = relationship("MenuMakan",back_populates="resep", cascade="all, delete-orphan")

    def __json__(self, request):
        return {
            'id': self.id,
            'nama_resep': self.nama_resep,
            'bahan': self.bahan,
            'langkah_memasak': self.langkah_memasak,
            'gambar': self.gambar,
        }

    def __repr__(self):
        return f"<Resep(id={self.id}, nama_resep='{self.nama_resep}')>"
    