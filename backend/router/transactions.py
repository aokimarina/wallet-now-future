# 残高取得
import requests

url = "https://api.sunabar.gmo-aozora.com/personal/v1/accounts/balances"

payload = {}
headers = {
  'Accept': 'application/json;charset=UTF-8',
  'Content-Type': 'application/json;charset=UTF-8',
  'x-access-token': 'NGEyZDlkYmMzZWVlNDFlZjQwMzAzODZm'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)

# 明細取得
import requests

url = "https://api.sunabar.gmo-aozora.com/personal/v1/accounts/transactions?accountId=302010010191&dateFrom=2024-06-17&dateTo=2024-06-18&nextItemKey=0"

payload = {}
headers = {
  'Accept': 'application/json;charset=UTF-8',
  'Content-Type': 'application/json;charset=UTF-8',
  'x-access-token': 'NGEyZDlkYmMzZWVlNDFlZjQwMzAzODZm'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
