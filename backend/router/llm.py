# from flask import Blueprint, request, jsonify
# import os
# import openai
# from flask_cors import cross_origin

# llm_bp = Blueprint('llm', __name__)

# # OpenAI APIキー
# openai_api_key = os.getenv("OPENAI_API_KEY")
# client = openai.OpenAI(api_key=openai_api_key)

# # CORSの設定を追加
# @llm_bp.route("/generate_advice", methods=["POST", "OPTIONS"])
# @cross_origin(origins="*")  # CORSを全てのオリジンに対して許可
# def generate_advice():
#     # OPTIONSメソッドのプリフライトリクエストに対応
#     if request.method == "OPTIONS":
#         return '', 200

#     try:
#         data = request.json
#         print("Received data:", data)

#         # フロントから送信されたデータを変数に代入
#         current_balance = float(data.get("current_balance"))
#         target_amount = float(data.get("target_amount"))
#         remaining_period = int(data.get("remaining_period"))
#         savings_this_month = float(data.get("savings_this_month"))

#         # 必要な貯金額を計算
#         required_savings = target_amount - current_balance
#         monthly_savings_needed = required_savings / remaining_period

#         # LLMへのプロンプト
#         prompt = f"""
#         目標金額: {target_amount}円
#         現在の残高: {current_balance}円
#         残り期間: {remaining_period}ヶ月
#         今月の貯金額: {savings_this_month}円
        
#         目標金額に到達するための貯金アドバイスを、次の条件を基にして100字以内でポジティブかつ励ましのある形で出してください:
#         - 毎月の貯金額が目標に対して十分かどうか
#         - もし足りない場合、どのように改善できるかアドバイスを提供
#         """

#         # OpenAI APIにリクエストを送信
#         response = client.chat.completions.create(
#             model="gpt-4",
#             messages=[{"role": "user", "content": prompt}],
#             max_tokens=150,
#             temperature=0.7
#         )

#         # 返ってきたアドバイスを取り出す
#         advice = response.choices[0].message.content.strip()
#         return jsonify({"advice": advice})

#     except Exception as e:
#         print(f"Error: {e}")
#         return jsonify({"error": "サーバー内部でエラーが発生しました", "details": str(e)}), 500
