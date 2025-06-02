# initialize_db.py

from sqlalchemy import create_engine
from ..models.meta import Base
from ..models.user import User
from ..models.resep import Resep
from ..models.menu_makan import MenuMakan

def main():
    from pyramid.paster import get_appsettings, setup_logging
    config_uri = 'development.ini'
    setup_logging(config_uri)
    settings = get_appsettings(config_uri)

    engine = create_engine(settings['sqlalchemy.url'])
    Base.metadata.create_all(engine)

    from sqlalchemy.orm import sessionmaker
    Session = sessionmaker(bind=engine)
    session = Session()

    try:
        print("Menghapus data lama...")
        session.query(MenuMakan).delete()
        session.query(Resep).delete()
        session.query(User).delete()

        print("Menambahkan sample data...")

        user = User(username='john_doe', email='john@example.com', password='secret')
        session.add(user)
        session.flush()

        resep = Resep(
            nama_resep='Nasi Goreng',
            bahan='Nasi, telur, kecap',
            langkah_memasak='Masukkan nasi, telur, kecap. Aduk hingga rata.'
        )
        session.add(resep)
        session.flush()

        menu = MenuMakan(
            user_id=user.id,
            hari='Senin',
            waktu_makan='dinner',
            resep_id=resep.id
        )
        session.add(menu)

        session.commit()
        print("✅ Sample data berhasil ditambahkan.")

    except Exception as e:
        session.rollback()
        print("❌ Error:", str(e))
        raise