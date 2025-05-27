# C:\Users\User\UAS_pemrogramanweb_HarisyaMiranti_122140049\mamkuy_backend\mamkuy_backend\mamkuy_backend\schemas\resep.py

from marshmallow import Schema, fields

class ResepSchema(Schema):
    id = fields.Int(dump_only=True)
    nama_resep = fields.Str(required=True)
    bahan = fields.Str(required=True) # Atau fields.List(fields.Str()) jika bahan berupa daftar string
    langkah_memasak = fields.Str(required=True)
    gambar = fields.Str(allow_none=True) # URL atau path gambar, boleh null

# Instance schema untuk satu objek Resep
resep_schema = ResepSchema()
# Instance schema untuk daftar (list) Resep
reseps_schema = ResepSchema(many=True)