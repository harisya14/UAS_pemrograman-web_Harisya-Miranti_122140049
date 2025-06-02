# mamkuy_backend/schemas/user.py
from marshmallow import Schema, fields

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    email = fields.Str(required=True)
    password = fields.Str(required=True)


class UserCreateSchema(UserSchema):
    pass


class UserUpdateSchema(Schema):
    username = fields.Str()
    email = fields.Str()
    password = fields.Str()