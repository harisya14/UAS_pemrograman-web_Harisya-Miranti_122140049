from sqlalchemy import (
    Column,
    Integer,
    String, # Untuk tipe data string dengan panjang tertentu
    Text,   # Untuk string yang lebih panjang tanpa batas ukuran (opsional, bisa pakai String)
    ForeignKey
)
from sqlalchemy.orm import relationship

# Impor Base dari meta.py
from .meta import Base
# Impor model Resep dan User karena ada relationship
from .resep import Resep
from .user import User # Asumsi Anda memiliki model User di models/user.py

class MenuMakan(Base):
    """
    Model SQLAlchemy untuk entitas Menu Makan.
    """
    # Mengubah nama tabel menjadi 'menu_makans' untuk konsistensi dengan 'reseps'
    # Jika Anda ingin tetap 'menu_makan', pastikan ForeignKey di model lain merujuk ke 'menu_makan.id'
    __tablename__ = 'menu_makans'

    id = Column(Integer, primary_key=True)
    
    # Foreign Key ke tabel users
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False) # Pastikan nama tabel 'users' cocok dengan __tablename__ di model User Anda
    
    hari = Column(String(20), nullable=False) # Contoh: 'Senin', 'Selasa', dll.
    waktu_makan = Column(String(20), nullable=False) # Contoh: 'breakfast', 'lunch', 'dinner'
    
    # Foreign Key ke tabel reseps
    resep_id = Column(Integer, ForeignKey('reseps.id'), nullable=False) # Pastikan nama tabel 'reseps' cocok dengan __tablename__ di model Resep Anda
    
    gambar = Column(Text, nullable=True) # Tambahkan kolom gambar seperti di entitas Menu Makan Anda

    # Relationships
    user = relationship("User") # Menghubungkan ke model User
    resep = relationship("Resep") # Menghubungkan ke model Resep

    def __json__(self, request):
        """
        Metode ini mendefinisikan bagaimana objek MenuMakan akan diserialisasi menjadi JSON.
        """
        user_data = None
        if self.user:
            # Anda bisa memilih field mana dari user yang ingin Anda sertakan
            user_data = {
                'id': self.user.id,
                'email': self.user.email, # Sesuaikan dengan field di model User Anda
                # 'username': self.user.username, # Jika ada
            }
        
        resep_data = None
        if self.resep:
            resep_data = {
                'id': self.resep.id,
                'nama_resep': self.resep.nama_resep,
                'bahan': self.resep.bahan,
                'langkah_memasak': self.resep.langkah_memasak,
                'gambar': self.resep.gambar,
            }

        return {
            'id': self.id,
            # 'kategori': self.kategori, # Anda punya kolom 'kategori' di presentasi, tapi tidak di code yang Anda berikan. Saya asumsikan ada.
            'user_id': self.user_id,
            'hari': self.hari,
            'waktu_makan': self.waktu_makan,
            'resep_id': self.resep_id,
            'gambar': self.gambar,
            'user': user_data,
            'resep': resep_data,
        }

    # Anda bisa menambahkan konstruktor __init__ jika dibutuhkan, atau membiarkan SQLAlchemy menanganinya secara default
    # def __init__(self, user_id, hari, waktu_makan, resep_id, gambar=None, kategori=None):
    #     self.user_id = user_id
    #     self.hari = hari
    #     self.waktu_makan = waktu_makan
    #     self.resep_id = resep_id
    #     self.gambar = gambar
    #     self.kategori = kategori

    def __repr__(self):
        return f"<MenuMakan(id={self.id}, hari='{self.hari}', waktu_makan='{self.waktu_makan}')>"