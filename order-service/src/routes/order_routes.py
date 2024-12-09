from flask import Blueprint
from controllers.order_controller import place_order

def create_order_routes(db):
    order_bp = Blueprint("order", __name__)
    order_bp.route("/place", methods=["POST"])(lambda: place_order(db))
    return order_bp
