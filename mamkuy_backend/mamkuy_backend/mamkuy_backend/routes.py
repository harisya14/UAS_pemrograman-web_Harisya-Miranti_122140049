# C:\Users\User\UAS_pemrogramanweb_HarisyaMiranti_122140049\mamkuy_backend\mamkuy_backend\mamkuy_backend\routes.py

def includeme(config):
    """
    Fungsi ini akan dipanggil oleh Pyramid saat 'config.include(".routes")'
    dieksekusi di __init__.py utama aplikasi Anda.
    """
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/') # Route untuk halaman utama (jika ada)

    # --- ROUTE UNTUK USER ---
    # GET /users - Mengambil semua user
    config.add_route('get_all_users', '/users', request_method='GET')
    # POST /users - Membuat user baru
    config.add_route('create_user', '/users', request_method='POST')
    # GET /users/{id} - Mengambil satu user berdasarkan ID
    config.add_route('get_user_by_id', '/users/{id}', request_method='GET')
    # PUT /users/{id} - Memperbarui user berdasarkan ID
    config.add_route('update_user', '/users/{id}', request_method='PUT')
    # DELETE /users/{id} - Menghapus user berdasarkan ID
    config.add_route('delete_user', '/users/{id}', request_method='DELETE')
    # --- AKHIR ROUTE UNTUK USER ---

    # --- ROUTE UNTUK RESEP ---
    # GET /reseps - Mengambil semua resep
    config.add_route('get_all_reseps', '/reseps', request_method='GET')
    # POST /reseps - Membuat resep baru
    config.add_route('create_resep', '/reseps', request_method='POST')
    # GET /reseps/{id} - Mengambil satu resep berdasarkan ID
    config.add_route('get_resep_by_id', '/reseps/{id}', request_method='GET')
    # PUT /reseps/{id} - Memperbarui resep berdasarkan ID
    config.add_route('update_resep', '/reseps/{id}', request_method='PUT')
    # DELETE /reseps/{id} - Menghapus resep berdasarkan ID
    config.add_route('delete_resep', '/reseps/{id}', request_method='DELETE')
    # --- AKHIR ROUTE UNTUK RESEP ---

    # --- ROUTE UNTUK MENU MAKAN ---
    # GET /menus - Mengambil semua menu makan
    config.add_route('get_all_menu_makans', '/menus', request_method='GET')
    # POST /menus - Membuat menu makan baru
    config.add_route('create_menu_makan', '/menus', request_method='POST')
    # GET /menus/{id} - Mengambil satu menu makan berdasarkan ID
    config.add_route('get_menu_makan_by_id', '/menus/{id}', request_method='GET')
    # PUT /menus/{id} - Memperbarui menu makan berdasarkan ID
    config.add_route('update_menu_makan', '/menus/{id}', request_method='PUT')
    # DELETE /menus/{id} - Menghapus menu makan berdasarkan ID
    config.add_route('delete_menu_makan', '/menus/{id}', request_method='DELETE')
    # GET /menus/user/{user_id} - Mengambil menu makan berdasarkan user ID
    config.add_route('get_menu_makans_by_user', '/menus/user/{user_id}', request_method='GET')
    # --- AKHIR ROUTE UNTUK MENU MAKAN ---

    config.add_route('register', '/register')
    config.add_route('login', '/login')
    config.add_route('logout', '/logout')