import sys
import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import openai


# 正しいパスを設定
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), 'backend')))

# .envファイルを読み込む
load_dotenv()

# OpenAIのAPIキーを環境変数から取得
openai_api_key = os.getenv("OPENAI_API_KEY")
client = openai.OpenAI(api_key=openai_api_key)  # 修正: openai.OpenAI() を使用

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"], "allow_headers": ["Content-Type", "Authorization"]}})

# インポートを実行
from router.balances import balances_bp
from router.transactions import transactions_bp
# from router.llm import llm_bp

# ブループリントを登録
app.register_blueprint(balances_bp, url_prefix="/balances")
app.register_blueprint(transactions_bp, url_prefix="/transactions")
# app.register_blueprint(llm_bp, url_prefix="/llm")


@app.route("/")
def hello():
    return "Hello, Flask!"


#------------------------------------------------------------------
# TODO:以下、LLMのroute、余裕があったらrouter配下に入れる。

@app.route("/generate_advice", methods=["POST"])
def generate_advice():
    try:
        data = request.json
        print("Received data:", data)

        current_balance = float(data.get("current_balance"))
        target_amount = float(data.get("target_amount"))
        remaining_period = int(data.get("remaining_period"))
        savings_this_month = float(data.get("savings_this_month"))

        required_savings = target_amount - current_balance
        monthly_savings_needed = required_savings / remaining_period

        prompt = f"""
        目標金額: {target_amount}円
        現在の残高: {current_balance}円
        残り期間: {remaining_period}ヶ月
        今月の貯金額: {savings_this_month}円
        
        目標金額に到達するための貯金アドバイスを、次の条件を基にして100字以内でポジティブかつ励ましのある形で出してください:
        - 毎月の貯金額が目標に対して十分かどうか
        - もし足りない場合、どのように改善できるかアドバイスを提供
        """

        # 修正: 正しい API 呼び出し
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=150,
            temperature=0.7
        )
        
        # 修正: 最新APIのレスポンス構造に対応
        advice = response.choices[0].message.content.strip()
        return jsonify({"advice": advice})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "サーバー内部でエラーが発生しました", "details": str(e)}), 500
    
#------------------------------------------------------

if __name__ == "__main__":
    app.run(debug=True, port=5000)
