from flask import Flask
from config.database import get_database
from routes.order_routes import create_order_routes
from dotenv import load_dotenv

load_dotenv()

def create_app():
    app = Flask(__name__)

    # Connect to MongoDB
    db = get_database()

    # Register routes
    app.register_blueprint(create_order_routes(db), url_prefix="/api/orders")

    return app
