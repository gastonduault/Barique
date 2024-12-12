import os

class Config:
    SQLALCHEMY_DATABASE_URI = (
        f"mysql://{os.getenv('MYSQL_USER', 'user')}:"
        f"{os.getenv('MYSQL_PASSWORD', 'password')}@"
        f"{os.getenv('MYSQL_HOST', 'mysql')}/"
        f"{os.getenv('MYSQL_DATABASE', 'polywine')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False


