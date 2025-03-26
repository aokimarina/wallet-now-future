from flask import  Blueprint, jsonify
import requests
import os

transactions_bp = Blueprint('transactions', __name__)

@transactions_bp.route("", methods=["GET"])
def get_transactions():
    url = "https://api.sunabar.gmo-aozora.com/personal/v1/accounts/transactions"
    x_access_token = os.getenv("X_ACCESS_TOKEN")
    headers = {
      'Accept': 'application/json;charset=UTF-8',
      'Content-Type': 'application/json;charset=UTF-8',
      'x-access-token': x_access_token
    }
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500    

