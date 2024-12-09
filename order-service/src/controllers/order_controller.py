import jwt
from flask import request, jsonify
from models.order_model import save_order
from config.rabbitmq import connect_rabbitmq
import os

def place_order(db):
    try:
        # Extract JWT from Authorization header
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"error": "Unauthorized"}), 401

        token = auth_header.split(" ")[1]
        try:
            user_data = jwt.decode(token, os.getenv("JWT_SECRET"), algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401

        # Parse order payload
        data = request.get_json()
        product = data.get("product")
        quantity = data.get("quantity")

        if not product or not quantity:
            return jsonify({"error": "Product and quantity are required"}), 400

        # Save order to MongoDB
        order = save_order(db, user_data["userId"], product, quantity)

        # # Publish order to RabbitMQ
        channel = connect_rabbitmq()
        channel.queue_declare(queue="order_placed")
        channel.basic_publish(
            exchange="",
            routing_key="order_placed",
            body=f"User {user_data['userId']} placed an order for {quantity} of {product}"
        )

        return jsonify({"message": "Order placed successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
