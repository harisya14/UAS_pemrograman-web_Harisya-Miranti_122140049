from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker, configure_mappers

# Import Base dari meta
from .meta import Base

# Import model (Pastikan model-model ini benar-benar ada dan didefinisikan dengan Base)
from .user import User
from .resep import Resep
from .menu_makan import MenuMakan
# from .mymodel import MyModel

DBSession = sessionmaker()

def get_engine(settings, prefix='sqlalchemy.'):
    return engine_from_config(settings, prefix)

def initialize_sql(settings):
    """
    Fungsi ini akan dipanggil oleh includeme untuk menginisialisasi database.
    """
    engine = get_engine(settings)
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine
    configure_mappers()
    Base.metadata.create_all(engine)

def includeme(config):
    """
    Fungsi includeme yang akan dipanggil oleh Pyramid.
    """
    settings = config.get_settings()
    initialize_sql(settings)
    # Tambahkan request method untuk session database agar bisa diakses di view
    config.add_request_method(lambda r: DBSession(), 'dbsession', reify=True)
    print("Database models and session configured.")