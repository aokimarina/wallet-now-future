import os
from dotenv import load_dotenv
import openai

# .env ファイルから環境変数を読み込む
load_dotenv()

# APIキーの設定
openai.api_key = os.getenv("OPENAI_API_KEY")

def main():
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # 必要なら "gpt-4" に変更
        messages=[
            {"role": "system", "content": "あなたは親切なアシスタントです。"},
            {"role": "user", "content": "こんにちは、今日の天気は？"}
        ]
    )

    # レスポンスの表示
    print(response["choices"][0]["message"]["content"])

if __name__ == "__main__":
    main()
