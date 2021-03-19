from flask import Flask


def create_app():
    app = Flask(__name__)
    app.secret_key = '#A7017'  # Session 값 암호화를 위한 Secret Key 설정

    from .views import main_views, auth_views
    app.register_blueprint(main_views.bp)# main_views의 함수를 블루프린트에 등록
    app.register_blueprint(auth_views.bp)# main_views의 함수를 블루프린트에 등록

    return app

if __name__ =="__main__":
    create_app(host='0.0.0.0')