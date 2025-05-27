# mamkuy_backend/models/user.py
from sqlalchemy import Column, Integer, Text, String
from .meta import Base

class User(Base):
    __tablename__ = 'users' # Pastikan nama tabel ini cocok dengan referensi ForeignKey

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False) # Contoh kolom
    email = Column(String(100), unique=True, nullable=False)
    password = Column(Text, nullable=False) # Simpan hash password, bukan plain text!

    def __json__(self, request):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
        }

    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}')>"