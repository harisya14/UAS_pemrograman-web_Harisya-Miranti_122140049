# views/resep.py

from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import (
    HTTPNotFound,
    HTTPBadRequest,
    HTTPNoContent
)
from marshmallow.exceptions import ValidationError
from ..models.resep import Resep
from ..schemas.resep import ResepSchema, ResepCreateSchema, ResepUpdateSchema


@view_config(route_name='api_v1.reseps', request_method='GET', renderer='json')
def get_reseps(request):
    reseps = request.dbsession.query(Resep).all()
    return ResepSchema(many=True).dump(reseps)


@view_config(route_name='api_v1.reseps', request_method='POST', renderer='json')
def create_resep(request):
    schema = ResepCreateSchema()
    try:
        data = schema.load(request.json_body)
    except ValidationError as err:
        raise HTTPBadRequest(json={'errors': err.messages})

    resep = Resep(**data)
    request.dbsession.add(resep)
    request.dbsession.flush()

    return ResepSchema().dump(resep)


@view_config(route_name='api_v1.resep', request_method='GET', renderer='json')
def get_resep(request):
    resep_id = int(request.matchdict['id'])
    resep = request.dbsession.query(Resep).get(resep_id)
    if not resep:
        raise HTTPNotFound()
    return ResepSchema().dump(resep)


@view_config(route_name='api_v1.resep', request_method='PUT', renderer='json')
def update_resep(request):
    resep_id = int(request.matchdict['id'])
    resep = request.dbsession.query(Resep).get(resep_id)
    if not resep:
        raise HTTPNotFound()