from marshmallow import Schema, fields, validate

class ResepSchema(Schema):
    """Schema for validating full Resep data."""
    
    id = fields.Integer(dump_only=True)
    nama_resep = fields.String(
        required=True,
        validate=validate.Length(min=2, max=100)
    )
    bahan = fields.String(
        required=True,
        validate=validate.Length(max=1000)
    )
    langkah_memasak = fields.String(
        required=True,
        validate=validate.Length(max=2000)
    )
    gambar = fields.String(allow_none=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)


class ResepCreateSchema(ResepSchema):
    """Schema for creating Resep (exclude read-only fields)."""
    pass


class ResepUpdateSchema(Schema):
    """Schema for updating Resep (only updatable fields)."""
    
    nama_resep = fields.String(validate=validate.Length(min=2, max=100))
    bahan = fields.String(validate=validate.Length(max=1000))
    langkah_memasak = fields.String(validate=validate.Length(max=2000))
    gambar = fields.String(allow_none=True)