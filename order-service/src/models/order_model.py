from datetime import datetime

def save_order(db, user_id, product, quantity):
    order = {
        "user_id": user_id,
        "product": product,
        "quantity": quantity,
        "timestamp": datetime.utcnow()
    }
    db.orders.insert_one(order)
    return order
