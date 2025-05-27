# mamkuy_backend/schemas/menu_makan.py

from marshmallow import Schema, fields

class MenuMakanSchema(Schema):
    id = fields.Int(dump_only=True)
    kategori = fields.Str(required=True)  # Sesuai dengan entitas Menu Makan di presentasi
    user_id = fields.Int(required=True)   # Foreign Key ke User
    hari = fields.Str(required=True)
    waktu_makan = fields.Str(required=True) # "breakfast", "lunch", "dinner"
    resep_id = fields.Int(required=True)  # Foreign Key ke Resep
    gambar = fields.Str(allow_none=True)  # URL atau path gambar, boleh null

# Instance schema untuk satu objek MenuMakan
menu_makan_schema = MenuMakanSchema()
# Instance schema untuk daftar (list) MenuMakan
menu_makans_schema = MenuMakanSchema(many=True)