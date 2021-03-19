from flask import Blueprint
from flask import render_template, request, jsonify, url_for, session, flash
import time, os

# auth 관련 접두어로 시작되는 url이 호출되면 auth_views 파일 함수들이 호출되도록 blueprint auth 추가
from pyflask.forms import UserLoginForm
from werkzeug.utils import redirect

bp = Blueprint('auth', __name__, url_prefix='/')

base_dir = os.path.dirname(__file__)
print(base_dir)
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

from pyflask.lib.SMSender import send, code_generator

# Firebase Region

dir = db.reference('Users')
ref = db.reference('Approved_Users')

t = time.localtime()
auth_code = code_generator()


@bp.route('/signup', methods=['GET', 'POST'])
def login():
    form = UserLoginForm()
    if request.method == 'GET':
        return render_template('auth/signup.html', form=form)

    elif request.method == 'POST':
        error = None
        phone_number = str(form.phone_number.data)
        visit_purpose = form.visit_purpose.data
        auth_field = form.auth_code.data

        print("/signup, 전화번호 : " + str(phone_number))
        print("/signup, 방문목적 : " + str(visit_purpose))
        print("/signup, auth_code : " + str(auth_field))

        if auth_field == auth_code:
            print("서버 인증 성공")
            session['user_phone'] = phone_number

            ref.update({phone_number: {
                'registered': time.time(),
                'visit_purpose': visit_purpose,
                'access_level': 'entry',  # Access Level : Attempt, Entry, Guest, Administrator,
                'valid_until': time.time() + 600,
                'last_visited': time.time()
            }})

            return redirect(url_for('main.index'))
        else:
            print("서버 인증 실패")
            error = "잘못된 인증번호를 입력하셨습니다."
            flash(error, 'error')
            return '', 204


@bp.route('/refer', methods=['GET', 'POST'])
def refer_info():
    data = request.get_json()
    if request.method == 'POST':
        print(data)
        phone_number = data['phone_number']
        visit_purpose = data['visit_purpose']

        # 일단 폼에 제대로 된 값을 입력했는지 확인
        # 승인된 번호인지 확인
        if phone_number in list(ref.get().keys()):
            # 방문 목적 관련 처리 # 폼에 제대로 입력했는지.
            if visit_purpose != "None":
                if visit_purpose in ref.child(str(phone_number)).get()['visit_purpose']:
                    print('폼 입력 요청 처리중 | 사전 승인된 유저로 판단됨 | auth_code : ' + str(auth_code))
                    # status_code =  send(phone_number,auth_code) 문자 송신
                    dir.update({phone_number: {  # db 추가
                        'registered': time.time(),
                        'access_level': 'attempt'
                    }})

                    return jsonify(result="success", result2={'code': auth_code})

                else:
                    print('폼 입력 요청 처리중 | 방문목적 불일치')
                    return jsonify(result="success", result2={'code': 'wrong_purpose'})

            else:
                print('폼 입력 요청 처리중 | 방문목적 입력 안함')
                return jsonify(result="success", result2={'code': 'none_purpose'})
        else:
            print('폼 입력 요청 처리중 | 비인가된 번호')
            return jsonify(result="success", result2={'code': 'invalid_number'})
