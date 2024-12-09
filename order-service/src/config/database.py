from pymongo import MongoClient
import os

def get_database():
    client = MongoClient(os.getenv("MONGO_URI"))
    return client[os.getenv("MONGO_DB")]
