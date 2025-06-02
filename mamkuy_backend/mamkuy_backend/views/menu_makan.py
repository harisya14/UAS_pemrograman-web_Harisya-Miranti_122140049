# views/menu_makan.py

from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import (
    HTTPNotFound,
    HTTPBadRequest,
    HTTPNoContent,
    HTTPForbidden
)
from marshmallow.exceptions import ValidationError
from ..models.menu_makan import MenuMakan
from ..schemas.menu_makan import MenuMakanSchema, MenuMakanCreateSchema, MenuMakanUpdateSchema
from sqlalchemy.orm import joinedload

@view_config(route_name='api_v1.menu_makans', request_method='GET', renderer='json')
def get_menu_makans(request):
    auth_header = request.headers.get('Authorization')

    if not auth_header or not auth_header.startswith('Bearer '):
        raise HTTPForbidden(json={'error': 'Token tidak valid'})

    user_id = auth_header.split(" ")[1]

    try:
        user_id = int(user_id)
    except ValueError:
        raise HTTPForbidden(json={'error': 'user_id tidak valid'})

    # Query database
    menu_makans = (
        request.dbsession.query(MenuMakan)
        .options(joinedload(MenuMakan.resep))
        .filter(MenuMakan.user_id == user_id)
        .all()
    )

    return MenuMakanSchema(many=True).dump(menu_makans)


@view_config(route_name='api_v1.menu_makans', request_method='POST', renderer='json')
def create_menu_makan(request):
    schema = MenuMakanCreateSchema()
    try:
        data = schema.load(request.json_body)
    except ValidationError as err:
        raise HTTPBadRequest(json={'errors': err.messages})

    menu_makan = MenuMakan(**data)
    request.dbsession.add(menu_makan)
    request.dbsession.flush()

    return MenuMakanSchema().dump(menu_makan)


@view_config(route_name='api_v1.menu_makan', request_method='GET', renderer='json')
def get_menu_makan(request):
    menu_makan_id = int(request.matchdict['id'])
    menu_makan = request.dbsession.query(MenuMakan).get(menu_makan_id)
    if not menu_makan:
        raise HTTPNotFound()
    return MenuMakanSchema().dump(menu_makan)


@view_config(route_name='api_v1.menu_makan', request_method='PUT', renderer='json')
def update_menu_makan(request):
    menu_makan_id = int(request.matchdict['id'])
    menu_makan = request.dbsession.query(MenuMakan).get(menu_makan_id)
    if not menu_makan:
        raise HTTPNotFound()

    schema = MenuMakanUpdateSchema()
    try:
        update_data = schema.load(request.json_body, partial=True)
    except ValidationError as err:
        raise HTTPBadRequest(json={'errors': err.messages})

    for key, value in update_data.items():
        setattr(menu_makan, key, value)

    request.dbsession.add(menu_makan)
    request.dbsession.flush()

    return MenuMakanSchema().dump(menu_makan)


@view_config(route_name='api_v1.menu_makan', request_method='DELETE')
def delete_menu_makan(request):
    menu_makan_id = int(request.matchdict['id'])
    menu_makan = request.dbsession.query(MenuMakan).get(menu_makan_id)
    if not menu_makan:
        raise HTTPNotFound()

    request.dbsession.delete(menu_makan)
    request.dbsession.flush()

    return HTTPNoContent()