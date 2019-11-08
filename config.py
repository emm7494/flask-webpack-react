import os
from dotenv import load_dotenv

BASE_DIR = os.getcwd()
load_dotenv(os.path.join(BASE_DIR, ".env"))

class Config(object):
    SECRET_KEY = os.getenv('SECRET_KEY')
    TESTING = os.getenv('TESTING')

    # Jinja2 Templating Engine
    EXPLAIN_TEMPLATE_RELOADING = os.getenv('EXPLAIN_TEMPLATE_RELOADING')
    TEMPLATES_AUTO_RELOAD = os.getenv("TEMPLATES_AUTO_RELOAD")
    
    # SQLAlchemy ORM
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL") or "sqlite:///" + os.path.join(BASE_DIR, "app_db.sqlite")
    SQLALCHEMY_TRACK_MODIFICATIONS = os.getenv("SQLALCHEMY_TRACK_MODIFICATIONS")