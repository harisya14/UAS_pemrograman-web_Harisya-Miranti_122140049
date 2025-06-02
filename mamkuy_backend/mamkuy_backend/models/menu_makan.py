# menu_makan.py

from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from .meta import Base
from .user import User
from .resep import Resep  # Sekarang ini aman

class MenuMakan(Base):
    __tablename__ = 'menu_makans'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    hari = Column(String(20), nullable=False)
    waktu_makan = Column(String(20), nullable=False)
    resep_id = Column(Integer, ForeignKey('reseps.id'), nullable=False)
    gambar = Column(Text, nullable=True)

    # Relationships
    user = relationship("User", back_populates="menu_makans")
    resep = relationship("Resep", lazy="joined", back_populates="menu_makans")

    def __json__(self, request):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'hari': self.hari,
            'waktu_makan': self.waktu_makan,
            'resep_id': self.resep_id,
            'kategori': self.kategori,
            'gambar': self.gambar,
            'user': self.user.__json__(request) if self.user else None,
            'resep': self.resep.__json__(request) if self.resep else None
        }

    def __repr__(self):
        return f"<MenuMakan(id={self.id}, hari='{self.hari}', waktu_makan='{self.waktu_makan}')>"