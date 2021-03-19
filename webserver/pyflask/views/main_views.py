import time

from flask import Blueprint, session, render_template, redirect, url_for, jsonify, request

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate("apiKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://cranberry-f84d9-default-rtdb.firebaseio.com/'
})

bp = Blueprint('main', __name__, url_prefix='/')
ref = db.reference('Approved_Users')


@bp.route('/hello')
def hello_cranberry():
    return 'hello cranberry!'


@bp.route('/')
def index():
    # 로그인 된 경우
    if 'user_phone' in session:
        user_phone = session['user_phone']
        valid_until = ref.child(user_phone).get()['valid_until']

        # 인증이 만료된 경우
        if ref.child(user_phone).get()['valid_until'] < time.time():
            print('사전 출입은 승인되어 있으나 인증이 만료되었습니다. 휴대폰 인증을 다시 진행하시기 바랍니다.')
            session.clear()

            return redirect((url_for('auth.login')))

        return render_template('offcanvas.html', user_phone=user_phone, valid_until = valid_until, sunrise = '')

    # 로그아웃 상태인 경우
    else:
        return redirect((url_for('auth.login')))

@bp.route('/refer/base_data', methods = ['GET', 'POST'])
def refer_valid():
    data = request.get_json() # 여기서 멈춤 // 아예 아무것도 못했다..
    if 'user_phone' in session:
        user_phone = session['user_phone']
        valid_until = ref.child(user_phone).get()['valid_until']

        return jsonify(result="success", result2={'code': valid_until})

    else:
        print('user_phone is not in session')
        return 204


@bp.route('/logout/', methods=['GET'])
def logout_now():
    session.clear()
    print("logout now")
    return redirect(url_for('main.index'))
