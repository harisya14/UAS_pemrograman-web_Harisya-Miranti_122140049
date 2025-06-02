from marshmallow import Schema, fields, validate
from marshmallow import fields, Schema

class ResepSchema(Schema):
    id = fields.Int()
    nama_resep = fields.Str()
    
class MenuMakanSchema(Schema):
    """Schema for validating full MenuMakan data."""
    
    id = fields.Integer(dump_only=True)
    user_id = fields.Integer(
        required=True,
        validate=validate.Range(min=1, error="User ID must be a positive integer.")
    )
    hari = fields.String(
        required=True,
        validate=validate.OneOf(
            ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
            error="Invalid day. Must be a valid weekday."
        )
    )
    waktu_makan = fields.String(
        required=True,
        validate=validate.OneOf(
            ["Sarapan", "Makan Siang", "Makan Malam"],
            error="Invalid meal time. Allowed values: breakfast, lunch, dinner."
        )
    )
    resep = fields.Nested(ResepSchema())
    gambar = fields.String(allow_none=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)

class MenuMakanCreateSchema(MenuMakanSchema):
    """Schema for creating MenuMakan (exclude read-only fields)."""
    pass

class MenuMakanUpdateSchema(Schema):
    """Schema for updating MenuMakan (only updatable fields)."""
    
    hari = fields.String(
        validate=validate.OneOf(
            ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
            error="Invalid day. Must be a valid weekday."
        )
    )
    waktu_makan = fields.String(
        validate=validate.OneOf(
            ["Sarapan", "Makan Siang", "Makan Malam"],
            error="Invalid meal time. Allowed values: breakfast, lunch, dinner."
        )
    )
    gambar = fields.String(allow_none=True)