# __init__.py

def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')

    # User routes
    config.add_route('api_v1.users', '/users')
    config.add_route('api_v1.user', '/users/{id:\d+}')

    # Resep routes
    config.add_route('api_v1.reseps', '/reseps')
    config.add_route('api_v1.resep', '/reseps/{id:\d+}')

    # Menu Makan routes
    config.add_route('api_v1.menu_makans', '/menu-makans')
    config.add_route('api_v1.menu_makan', '/menu-makans/{id:\d+}')

    config.add_route('api_v1.register', '/register')
    config.add_route('api_v1.login', '/login')
    config.add_route('api_v1.logout', '/logout')