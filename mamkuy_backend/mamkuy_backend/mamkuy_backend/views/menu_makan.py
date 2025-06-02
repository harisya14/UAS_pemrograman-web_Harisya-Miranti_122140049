from pyramid.view import view_config
from pyramid.response import Response # Sebenarnya tidak digunakan secara langsung di sini karena renderer='json'
from sqlalchemy.orm.exc import NoResultFound # Tidak digunakan secara langsung, DBSession.get lebih modern
from ..models import DBSession, MenuMakan
from ..schemas.menu_makan import MenuMakanSchema

# Inisialisasi schema (sudah benar)
menu_schema = MenuMakanSchema()
menus_schema = MenuMakanSchema(many=True)

# --- GET ALL MENUS ---
@view_config(route_name='get_all_menu_makans', renderer='json', request_method='GET')
def get_all_menu_makans_view(request): # Ubah nama fungsi agar lebih deskriptif
    """
    Mengambil semua entri MenuMakan dari database.
    """
    menus = DBSession.query(MenuMakan).all()
    return menus_schema.dump(menus)

# --- GET SINGLE MENU BY ID ---
@view_config(route_name='get_menu_makan_by_id', renderer='json', request_method='GET')
def get_menu_makan_by_id_view(request): # Ubah nama fungsi agar lebih deskriptif
    """
    Mengambil satu entri MenuMakan berdasarkan ID.
    """
    menu_id = request.matchdict.get('id')
    # Gunakan DBSession.query().get() atau filter_by().first() jika DBSession.get() tidak berfungsi
    # menu = DBSession.get(MenuMakan, menu_id) # DBSession.get() adalah metode yang lebih baru
    menu = request.dbsession.query(MenuMakan).filter_by(id=menu_id).first()

    if menu is None:
        request.response.status_code = 404 # Mengatur status HTTP response
        return {"error": "Menu makan tidak ditemukan"}
    return menu_schema.dump(menu)

# --- GET MENUS BY USER ID ---
@view_config(route_name='get_menu_makans_by_user', renderer='json', request_method='GET')
def get_menu_makans_by_user_view(request): # Ubah nama fungsi agar lebih deskriptif
    """
    Mengambil semua entri MenuMakan berdasarkan user_id.
    """
    user_id = request.matchdict.get('user_id')
    # Pastikan user_id adalah integer jika disimpan sebagai integer di database
    try:
        user_id = int(user_id)
    except ValueError:
        request.response.status_code = 400
        return {"error": "User ID tidak valid."}

    menus = request.dbsession.query(MenuMakan).filter_by(user_id=user_id).all()
    return menus_schema.dump(menus)

# --- CREATE MENU ---
@view_config(route_name='create_menu_makan', renderer='json', request_method='POST')
def create_menu_makan_view(request):
    """
    Membuat entri MenuMakan baru.
    """
    try:
        # Tampilkan payload untuk debugging
        print("Payload diterima:", request.json_body)

        # Validasi input menggunakan schema
        validated_data = menu_schema.load(request.json_body)

        print("Validated Data:", validated_data)  # Log data setelah validasi

        menu = MenuMakan(**validated_data)
        request.dbsession.add(menu)
        request.dbsession.flush()

        return menu_schema.dump(menu)

    except Exception as e:
        print("Error saat membuat menu makan:", str(e))
        request.response.status_code = 400
        return {"error": "Data input tidak valid", "details": str(e)}

    # Buat objek MenuMakan dari data yang divalidasi
    menu = MenuMakan(**validated_data)
    request.dbsession.add(menu)
    request.dbsession.flush() # Flush untuk mendapatkan ID jika diperlukan segera
    return menu_schema.dump(menu)

# --- UPDATE MENU ---
@view_config(route_name='update_menu_makan', renderer='json', request_method='PUT')
def update_menu_makan_view(request): # Ubah nama fungsi agar lebih deskriptif
    """
    Memperbarui entri MenuMakan yang sudah ada berdasarkan ID.
    """
    menu_id = request.matchdict.get('id')
    # menu = DBSession.get(MenuMakan, menu_id)
    menu = DBSession.query(MenuMakan).filter_by(id=menu_id).first()

    if menu is None:
        request.response.status_code = 404
        return {"error": "Menu makan tidak ditemukan"}

    try:
        # Validasi dan load data, partial=True memungkinkan update sebagian field
        validated_data = menu_schema.load(request.json_body, partial=True)
    except Exception as e:
        request.response.status_code = 400
        return {"error": "Data input tidak valid", "details": str(e)}

    # Perbarui atribut objek menu dengan data yang divalidasi
    for field, value in validated_data.items():
        setattr(menu, field, value)
    
    # Tidak perlu DBSession.add(menu) atau DBSession.flush() untuk update
    # karena objek sudah terikat dengan sesi dan perubahan akan disimpan saat commit
    return menu_schema.dump(menu)

# --- DELETE MENU ---
@view_config(route_name='delete_menu_makan', renderer='json', request_method='DELETE')
def delete_menu_makan_view(request): # Ubah nama fungsi agar lebih deskriptif
    """
    Menghapus entri MenuMakan berdasarkan ID.
    """
    menu_id = request.matchdict.get('id')
    # menu = DBSession.get(MenuMakan, menu_id)
    menu = DBSession.query(MenuMakan).filter_by(id=menu_id).first()

    if menu is None:
        request.response.status_code = 404
        return {"error": "Menu makan tidak ditemukan"}

    DBSession.delete(menu)
    # Tidak perlu DBSession.flush() di sini, commit akan menangani penghapusan
    return {"message": "Menu makan berhasil dihapus"}