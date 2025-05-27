# mamkuy_backend/__init__.py
from pyramid.config import Configurator
# Hapus import CORS yang lain seperti pyramid.events, pyramid.view, CorsService

# --- Ini adalah middleware CORS yang akan membungkus aplikasi WSGI ---
class CORSMiddleware(object):
    def __init__(self, app, origins='*', methods='*', headers='*', max_age=3600):
        self.app = app
        self.origins = origins
        self.methods = methods
        self.headers = headers
        self.max_age = str(max_age)

    def __call__(self, environ, start_response):
        def _start_response(status, headers, exc_info=None):
            # Tambahkan header CORS ke semua respons
            headers.append(('Access-Control-Allow-Origin', self.origins))
            headers.append(('Access-Control-Allow-Methods', self.methods))
            headers.append(('Access-Control-Allow-Headers', self.headers))
            headers.append(('Access-Control-Max-Age', self.max_age))

            # Handle preflight OPTIONS request
            if environ['REQUEST_METHOD'] == 'OPTIONS':
                start_response('200 OK', headers)
                return [] # Langsung akhiri respons untuk OPTIONS

            return start_response(status, headers, exc_info)

        return self.app(environ, _start_response)

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application. """
    with Configurator(settings=settings) as config:
        # config.include('pyramid_jinja2') # Hapus jika tidak perlu
        config.include('.routes')
        config.include('.models')
        # Hapus semua baris config.add_subscriber, config.add_route('cors_options')

        config.scan()
        app = config.make_wsgi_app()

    # --- BUNGKUS APLIKASI DENGAN MIDDLEWARE CORS ---
    return CORSMiddleware(
        app, 
        origins='*', # Atau 'http://localhost:5173' untuk production
        methods='GET, POST, PUT, DELETE, OPTIONS',
        headers='Content-Type, Authorization'
    )