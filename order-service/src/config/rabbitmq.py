import pika
import os

def connect_rabbitmq():
    connection = pika.BlockingConnection(
    pika.ConnectionParameters(
        host=os.getenv("RABBITMQ_HOST"),
        credentials=pika.PlainCredentials("user", "password")
    )
    )
    channel = connection.channel()
    print("Connected to RabbitMQ")
    return channel
