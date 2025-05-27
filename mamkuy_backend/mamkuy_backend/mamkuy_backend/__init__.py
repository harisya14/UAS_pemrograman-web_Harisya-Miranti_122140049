# mamkuy_backend/__init__.py
from pyramid.config import Configurator
from pyramid.events import NewRequest
from pyramid.view import view_config

# --- Fungsi untuk menambahkan header CORS ---
def add_cors_headers(event):
    event.request.response.headers['Access-Control-Allow-Origin'] = '*' # Atau 'http://localhost:5173'
    event.request.response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    event.request.response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    event.request.response.headers['Access-Control-Max-Age'] = '3600'

# --- View untuk menangani OPTIONS requests (preflight requests) ---
@view_config(route_name='cors_options', renderer='json', request_method='OPTIONS')
def cors_options_view(request):
    return {}

def main(global_config, **settings):
    with Configurator(settings=settings) as config:
        # HAPUS ATAU KOMENTARI BARIS INI:
        # config.include('pyramid_jinja2')

        config.include('.routes')
        config.include('.models')

        config.add_subscriber(add_cors_headers, NewRequest)
        config.add_route('cors_options', '/{catchall:.*}', request_method='OPTIONS')

        config.scan()
    return config.make_wsgi_app()
