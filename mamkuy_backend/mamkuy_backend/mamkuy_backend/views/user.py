from pyramid.view import view_config
from sqlalchemy.exc import IntegrityError # Untuk menangani error duplikasi data
# Hapus import DBSession dari sini karena kita akan menggunakan request.dbsession
# from ..models import DBSession, User
from ..models import User # Hanya import model User yang dibutuhkan
from ..schemas.user import UserSchema # Pastikan ini mengimpor UserSchema yang sudah benar
from marshmallow import ValidationError # <--- IMPORT INI

# Inisialisasi schema (sudah benar)
user_schema = UserSchema()
users_schema = UserSchema(many=True)

# --- GET ALL USERS ---
@view_config(route_name='get_all_users', renderer='json', request_method='GET')
def get_all_users_view(request):
    """
    Mengambil semua entri User dari database.
    """
    users = request.dbsession.query(User).all()
    return users_schema.dump(users)

# --- GET SINGLE USER BY ID ---
@view_config(route_name='get_user_by_id', renderer='json', request_method='GET')
def get_user_by_id_view(request):
    """
    Mengambil satu entri User berdasarkan ID.
    """
    user_id = request.matchdict.get('id')
    user = request.dbsession.query(User).filter_by(id=user_id).first()

    if user is None:
        request.response.status_code = 404
        return {"error": "User tidak ditemukan"}
    return user_schema.dump(user)

# --- CREATE USER ---
@view_config(route_name='create_user', renderer='json', request_method='POST')
def create_user_view(request):
    """
    Membuat entri User baru.
    """
    try:
        validated_data = user_schema.load(request.json_body)
    except ValidationError as e:
        request.response.status_code = 400
        print("Validation Error Details (CREATE USER):", e.messages)
        return {"error": "Data input tidak valid", "details": e.messages}
    except Exception as e:
        request.response.status_code = 400
        print("Unexpected Error during validation (CREATE USER):", str(e))
        return {"error": "Data input tidak valid (unexpected)", "details": str(e)}

    try:
        user = User(**validated_data)
        request.dbsession.add(user)
        request.dbsession.flush() # Penting agar 'user.id' terisi setelah add

        # --- PASTIKAN BARIS INI ADA DAN TIDAK DIKOMENTARI ---
        return user_schema.dump(user) # Ini akan mengembalikan objek user lengkap dengan ID-nya
        # --- AKHIR BAGIAN KRUSIAL ---

    except IntegrityError:
        request.response.status_code = 409
        return {"error": "Username atau email sudah digunakan"}
    except Exception as e:
        request.response.status_code = 500
        print("Error saving user to DB:", str(e))
        return {"error": "Terjadi kesalahan saat membuat user", "details": str(e)}

# --- UPDATE USER ---
@view_config(route_name='update_user', renderer='json', request_method='PUT')
def update_user_view(request):
    """
    Memperbarui entri User yang sudah ada berdasarkan ID.
    """
    user_id = request.matchdict.get('id')
    user = request.dbsession.query(User).filter_by(id=user_id).first()

    if user is None:
        request.response.status_code = 404
        return {"error": "User tidak ditemukan"}

    try:
        # Validasi dan load data, partial=True memungkinkan update sebagian field
        validated_data = user_schema.load(request.json_body, partial=True)
    except ValidationError as e: # <--- UBAH INI UNTUK MENANGANI VALIDATIONERROR SPESIFIK
        request.response.status_code = 400
        print("Validation Error Details (UPDATE USER):", e.messages) # <--- LOG DETAIL ERROR
        return {"error": "Data input tidak valid", "details": e.messages}
    except Exception as e:
        request.response.status_code = 400
        print("Unexpected Error during validation (UPDATE USER):", str(e))
        return {"error": "Data input tidak valid (unexpected)", "details": str(e)}

    try:
        # Perbarui atribut objek user dengan data yang divalidasi
        for field, value in validated_data.items():
            setattr(user, field, value)
        # Perubahan akan disimpan saat sesi di-commit (tidak perlu request.dbsession.add() untuk update)
        return user_schema.dump(user)
    except IntegrityError:
        request.response.status_code = 409
        return {"error": "Username atau email sudah digunakan oleh user lain"}
    except Exception as e:
        request.response.status_code = 500
        print("Error updating user in DB:", str(e))
        return {"error": "Terjadi kesalahan saat memperbarui user", "details": str(e)}

# --- DELETE USER ---
@view_config(route_name='delete_user', renderer='json', request_method='DELETE')
def delete_user_view(request):
    """
    Menghapus entri User berdasarkan ID.
    """
    user_id = request.matchdict.get('id')
    user = request.dbsession.query(User).filter_by(id=user_id).first()

    if user is None:
        request.response.status_code = 404
        return {"error": "User tidak ditemukan"}

    try:
        request.dbsession.delete(user)
        return {"message": "User berhasil dihapus"}
    except Exception as e:
        request.response.status_code = 500
        print("Error deleting user from DB:", str(e))
        return {"error": "Terjadi kesalahan saat menghapus user", "details": str(e)}