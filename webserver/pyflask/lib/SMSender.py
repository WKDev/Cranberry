import requests
import json
import sys
import os.path
import time
import random

import auth
import config


def code_generator():
    t = time.localtime()
    random.seed(t.tm_mday + t.tm_hour + t.tm_min + int(t.tm_sec / 30))
    six_digit = int(random.random() * 1000000)
    if six_digit/100000 < 1:
        six_digit = six_digit*10
    return six_digit

def send(phone, code):

    data = {
        'message': {
            'to': phone,
            'from': '01047383672',
            'text': '인증번호 [' + str(code) + ']를 입력해주세요.' # 한글 45자, 영어 90자 이상이면 LMS로 자동 발송
        }
    }
    res = requests.post(config.getUrl('/messages/v4/send'), headers=auth.get_headers(config.apiKey, config.apiSecret), json=data)
    print(json.dumps(json.loads(res.text), indent=2, ensure_ascii=False))
    return json.loads(res.text)["statusCode"]




if __name__ == "__main__":
    send("01047383672", "000")
