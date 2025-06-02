# mamkuy_backend/models/user.py
from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from .meta import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(Text, nullable=False)

    # Relasi dengan cascade delete
    menu_makans = relationship("MenuMakan", back_populates="user", cascade="all, delete-orphan")

    def __json__(self, request):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
        }

    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}')>"