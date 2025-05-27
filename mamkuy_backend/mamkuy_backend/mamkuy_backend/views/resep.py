from pyramid.view import view_config
from sqlalchemy.exc import IntegrityError # Untuk menangani error duplikasi data
# Hapus import DBSession dari sini karena kita akan menggunakan request.dbsession
# from ..models import DBSession, Resep
from ..models import Resep # Hanya import model Resep
from ..schemas.resep import ResepSchema # Pastikan ini mengimpor ResepSchema yang sudah benar

# Inisialisasi schema (sudah benar)
resep_schema = ResepSchema()
reseps_schema = ResepSchema(many=True)

# --- GET ALL RESEPS ---
@view_config(route_name='get_all_reseps', renderer='json', request_method='GET')
def get_all_reseps_view(request): # Ubah nama fungsi agar lebih deskriptif
    """
    Mengambil semua entri Resep dari database.
    """
    reseps = request.dbsession.query(Resep).all() # PERUBAHAN DI SINI
    return reseps_schema.dump(reseps)

# --- GET SINGLE RESEP BY ID ---
@view_config(route_name='get_resep_by_id', renderer='json', request_method='GET')
def get_resep_by_id_view(request): # Ubah nama fungsi agar lebih deskriptif
    """
    Mengambil satu entri Resep berdasarkan ID.
    """
    resep_id = request.matchdict.get('id')
    # Gunakan request.dbsession.query().filter_by().first()
    resep = request.dbsession.query(Resep).filter_by(id=resep_id).first() # PERUBAHAN DI SINI

    if resep is None:
        request.response.status_code = 404 # Mengatur status HTTP response
        return {"error": "Resep tidak ditemukan"}
    return resep_schema.dump(resep)

# --- CREATE RESEP ---
@view_config(route_name='create_resep', renderer='json', request_method='POST')
def create_resep_view(request): # Ubah nama fungsi agar lebih deskriptif
    """
    Membuat entri Resep baru.
    """
    try:
        # Validasi input menggunakan schema
        validated_data = resep_schema.load(request.json_body)
    except Exception as e: # Tangani error validasi Marshmallow
        request.response.status_code = 400
        return {"error": "Data input tidak valid", "details": str(e)}

    try:
        resep = Resep(**validated_data)
        request.dbsession.add(resep) # PERUBAHAN DI SINI
        request.dbsession.flush() # PERUBAHAN DI SINI
        return resep_schema.dump(resep)
    except IntegrityError:
        request.response.status_code = 409 # Conflict
        return {"error": "Terjadi konflik data (misal: duplikasi)"}
    except Exception as e:
        request.response.status_code = 500 # Internal Server Error
        return {"error": "Terjadi kesalahan saat membuat resep", "details": str(e)}

# --- UPDATE RESEP ---
@view_config(route_name='update_resep', renderer='json', request_method='PUT')
def update_resep_view(request): # Ubah nama fungsi agar lebih deskriptif
    """
    Memperbarui entri Resep yang sudah ada berdasarkan ID.
    """
    resep_id = request.matchdict.get('id')
    resep = request.dbsession.query(Resep).filter_by(id=resep_id).first() # PERUBAHAN DI SINI

    if resep is None:
        request.response.status_code = 404
        return {"error": "Resep tidak ditemukan"}

    try:
        # Validasi dan load data, partial=True memungkinkan update sebagian field
        validated_data = resep_schema.load(request.json_body, partial=True)
    except Exception as e:
        request.response.status_code = 400
        return {"error": "Data input tidak valid", "details": str(e)}

    try:
        # Perbarui atribut objek resep dengan data yang divalidasi
        for field, value in validated_data.items():
            setattr(resep, field, value)
        # Perubahan akan disimpan saat sesi di-commit (tidak perlu request.dbsession.add() untuk update)
        return resep_schema.dump(resep)
    except IntegrityError:
        request.response.status_code = 409
        return {"error": "Terjadi konflik data (misal: duplikasi)"}
    except Exception as e:
        request.response.status_code = 500
        return {"error": "Terjadi kesalahan saat memperbarui resep", "details": str(e)}

# --- DELETE RESEP ---
@view_config(route_name='delete_resep', renderer='json', request_method='DELETE')
def delete_resep_view(request): # Ubah nama fungsi agar lebih deskriptif
    """
    Menghapus entri Resep berdasarkan ID.
    """
    resep_id = request.matchdict.get('id')
    resep = request.dbsession.query(Resep).filter_by(id=resep_id).first() # PERUBAHAN DI SINI

    if resep is None:
        request.response.status_code = 404
        return {"error": "Resep tidak ditemukan"}

    try:
        request.dbsession.delete(resep) # PERUBAHAN DI SINI
        return {"message": "Resep berhasil dihapus"}
    except Exception as e:
        request.response.status_code = 500
        return {"error": "Terjadi kesalahan saat menghapus resep", "details": str(e)}