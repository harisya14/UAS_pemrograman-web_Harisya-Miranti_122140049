# views/user.py

from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import (
    HTTPNotFound,
    HTTPBadRequest,
    HTTPNoContent
)
from marshmallow.exceptions import ValidationError
from ..models.user import User
from ..schemas.user import UserSchema, UserCreateSchema, UserUpdateSchema


@view_config(route_name='api_v1.users', request_method='GET', renderer='json')
def get_users(request):
    users = request.dbsession.query(User).all()
    return UserSchema(many=True).dump(users)


@view_config(route_name='api_v1.users', request_method='POST', renderer='json')
def create_user(request):
    schema = UserCreateSchema()
    try:
        data = schema.load(request.json_body)
    except ValidationError as err:
        raise HTTPBadRequest(json={'errors': err.messages})

    # Cek apakah email sudah ada
    existing_email = request.dbsession.query(User).filter(User.email == data['email']).first()
    if existing_email:
        raise HTTPBadRequest(json={'errors': {'email': ['Email already exists']}})

    user = User(**data)
    request.dbsession.add(user)
    request.dbsession.flush()

    return UserSchema().dump(user)


@view_config(route_name='api_v1.user', request_method='GET', renderer='json')
def get_user(request):
    user_id = int(request.matchdict['id'])
    user = request.dbsession.query(User).get(user_id)
    if not user:
        raise HTTPNotFound()
    return UserSchema().dump(user)


@view_config(route_name='api_v1.user', request_method='PUT', renderer='json')
def update_user(request):
    user_id = int(request.matchdict['id'])
    user = request.dbsession.query(User).get(user_id)
    if not user:
        raise HTTPNotFound()

    schema = UserUpdateSchema()
    try:
        update_data = schema.load(request.json_body, partial=True)
    except ValidationError as err:
        raise HTTPBadRequest(json={'errors': err.messages})

    for key, value in update_data.items():
        setattr(user, key, value)

    request.dbsession.add(user)
    request.dbsession.flush()

    return UserSchema().dump(user)


@view_config(route_name='api_v1.user', request_method='DELETE')
def delete_user(request):
    user_id = int(request.matchdict['id'])
    user = request.dbsession.query(User).get(user_id)
    if not user:
        raise HTTPNotFound()

    request.dbsession.delete(user)
    request.dbsession.flush()

    return HTTPNoContent()