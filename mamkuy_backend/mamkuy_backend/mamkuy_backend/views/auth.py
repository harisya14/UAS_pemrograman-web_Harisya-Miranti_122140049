# mamkuy_backend/views/auth.py

from pyramid.view import view_config
from pyramid.response import Response
from pyramid.security import remember, forget
from sqlalchemy.exc import IntegrityError
from ..models import User
from ..schemas.user import UserSchema
from marshmallow import ValidationError


# Inisialisasi schema
user_schema = UserSchema(exclude=['password'])  # Hindari kirim password ke client
register_schema = UserSchema(only=["username", "email", "password"])


# --- REGISTER ---
@view_config(route_name='register', renderer='json', request_method='POST')
def register_view(request):
    """
    Endpoint untuk mendaftarkan user baru.
    
    Input:
    {
        "username": "string",
        "email": "string",
        "password": "string"
    }

    Output:
    {
        "id": integer,
        "username": "string",
        "email": "string"
    }
    """
    try:
        data = register_schema.load(request.json_body)
    except ValidationError as e:
        request.response.status_code = 400
        return {"error": "Validasi gagal", "details": e.messages}

    try:
        new_user = User(**data)
        request.dbsession.add(new_user)
        request.dbsession.flush()  # Untuk dapatkan ID setelah insert

        # Return user tanpa password
        return user_schema.dump(new_user)

    except IntegrityError:
        request.response.status_code = 409
        return {"error": "Username atau email sudah terdaftar"}
    except Exception as e:
        request.response.status_code = 500
        return {"error": "Gagal mendaftarkan user", "details": str(e)}


# --- LOGIN ---
@view_config(route_name='login', renderer='json', request_method='POST')
def login_view(request):
    """
    Endpoint untuk login user berdasarkan username/email dan password.

    Input:
    {
        "username" / "email": "string",
        "password": "string"
    }

    Output:
    {
        "id": integer,
        "username": "string",
        "email": "string"
    }
    """
    data = request.json_body
    username_or_email = data.get('username') or data.get('email')
    password = data.get('password')

    if not username_or_email or not password:
        request.response.status_code = 400
        return {"error": "Username/email dan password harus diisi"}

    user = request.dbsession.query(User).filter(
        (User.username == username_or_email) | (User.email == username_or_email)
    ).first()

    if not user or user.password != password:
        request.response.status_code = 401
        return {"error": "Kredensial tidak valid"}

    headers = remember(request, user.id)

    # Kirim data user tanpa password
    return Response(
        json_body=user_schema.dump(user),
        headers=headers
    )


# --- LOGOUT ---
@view_config(route_name='logout', renderer='json', request_method='POST')
def logout_view(request):
    """
    Endpoint untuk logout user.
    
    Output:
    {
        "message": "Logout berhasil"
    }
    """
    headers = forget(request)
    return Response(
        json_body={"message": "Logout berhasil"},
        headers=headers
    )