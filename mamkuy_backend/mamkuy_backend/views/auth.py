# views/auth.py

from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import (
    HTTPBadRequest,
    HTTPFound,
    HTTPUnauthorized,
    HTTPConflict
)
from pyramid.security import remember, forget
from marshmallow.exceptions import ValidationError
from ..models.user import User
from ..schemas.user import UserCreateSchema, UserSchema


@view_config(route_name='api_v1.register', request_method='POST', renderer='json')
def register(request):
    """Register a new user with raw password."""
    schema = UserCreateSchema()
    try:
        data = schema.load(request.json_body)
    except ValidationError as err:
        raise HTTPBadRequest(json={'errors': err.messages})

    # Cek apakah email sudah terdaftar
    existing_user = request.dbsession.query(User).filter(User.email == data['email']).first()
    if existing_user:
        raise HTTPConflict(json={'errors': {'email': ['Email already registered']}})

    # Simpan password secara mentah (raw)
    user = User(**data)
    request.dbsession.add(user)
    request.dbsession.flush()

    return UserSchema().dump(user)


from pyramid.security import remember
from pyramid.response import Response

@view_config(route_name='api_v1.login', request_method='POST', renderer='json')
def login_view(request):
    email = request.json_body.get('email')
    password = request.json_body.get('password')

    if not email or not password:
        raise HTTPBadRequest(json={'error': 'Email and password are required'})

    user = request.dbsession.query(User).filter(User.email == email).first()

    if not user or user.password != password:
        raise HTTPUnauthorized(json={'error': 'Invalid credentials'})

    headers = remember(request, user.id)

    # Kirim seluruh data user ke frontend
    return Response(
        json_body={
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'message': 'Login success'
        },
        headers=headers
    )

@view_config(route_name='api_v1.logout', request_method='POST')
def logout(request):
    """Logout the current user."""
    headers = forget(request)
    return Response(json_body={'message': 'Successfully logged out'}, headers=headers)