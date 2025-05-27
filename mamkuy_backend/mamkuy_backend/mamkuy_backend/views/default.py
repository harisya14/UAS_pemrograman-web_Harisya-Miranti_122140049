# mamkuy_backend/mamkuy_backend/mamkuy_backend/views/default.py

from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import SQLAlchemyError

from ..models import DBSession, User, Resep, MenuMakan # Import model yang Anda gunakan

@view_config(route_name='home', renderer='mamkuy_backend/mamkuy_backend/mamkuy_backend:templates/mytemplate.jinja2')
def my_view(request):
    """
    Ini adalah view default yang merender template mytemplate.jinja2
    dan mencoba melakukan query ke database.
    """
    try:
        user_count = request.dbsession.query(User).count()
        return {'project': 'mamkuy_backend', 'user_count': user_count}

    except SQLAlchemyError as e:
        print(f"Database error in my_view: {e}")
        return Response(db_err_msg, content_type='text/plain', status=500)

db_err_msg = """\
Pyramid is having a problem using your SQL database.  The problem
might be caused by one of the following things:

1.  You may need to initialize your database tables with `alembic`.
    Check your README.txt for descriptions and try to run it.

2.  Your database server may not be running.  Check that the
    database server referred to by the "sqlalchemy.url" setting in
    your "development.ini" file is running.

After you fix the problem, please restart the Pyramid application to
try it again.
"""