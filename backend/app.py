from flask import Flask, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

# .envファイルを読み込む
load_dotenv()

app = Flask(__name__)
# ここでCORSを有効化。開発時は "*" で広く許可しているが、
# 本番運用では許可するオリジンを限定すること！
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/")
def hello():
    return "Hello, Flask!"

# 外部APIから残高を取得するエンドポイント

@app.route("/balances", methods=["GET"])
def get_balances():
    url = "https://api.sunabar.gmo-aozora.com/personal/v1/accounts/balances"

    # .env から読み込んだ x-access-token の値
    x_access_token = os.getenv("X_ACCESS_TOKEN")

    # 必要なヘッダを設定
    headers = {
        "Accept": "application/json;charset=UTF-8",
        "Content-Type": "application/json;charset=UTF-8",
        "x-access-token": x_access_token
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # 4xx/5xx の場合は例外を投げる
        data = response.json()
        return jsonify(data)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500
    
    

if __name__ == "__main__":
    app.run(debug=True, port=5000)