from pyramid.config import Configurator
from pyramid.renderers import JSON
from .views.cors import cors_tween_factory

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    with Configurator(settings=settings) as config:
        config.add_tween('.cors_tween_factory')  # Add CORS tween
        config.add_renderer('json', JSON(indent=4))

        config.include('pyramid_jinja2')
        config.include('.routes')
        config.include('.models')
        config.scan()
    return config.make_wsgi_app()
