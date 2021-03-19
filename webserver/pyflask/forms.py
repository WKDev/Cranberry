import firebase_admin
from firebase_admin import credentials, db
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, Length

# cred = credentials.Certificate("apiKey.json")
# firebase_admin.initialize_app(cred, {
#     'databaseURL': 'https://cranberry-f84d9-default-rtdb.firebaseio.com/'
# })
# dir = db.reference('Users')
# ref = db.reference('Approved_Users')
#
#
# def isapproved(self, phone_num):
#     if phone_num in list(ref.get().keys()):  # ref.get은 딕셔너리 형태, .keys() : 딕셔너리에서 키들만 dict_keys 형태로 반환함
#         return True
#     else:
#         return False


class UserLoginForm(FlaskForm):
    phone_number = StringField('전화번호', validators=[DataRequired(), Length(min=11, max=11)])
    visit_purpose = SelectField('방문목적', choices=[('None', '방문 목적을 선택해주세요'), ('elec', '전기 검침'), ('tap', '수도 검침'),('delivery', '택배'), ('inout', '단순출입'),('tap', '방문')])
    auth_code = IntegerField('인증번호', validators=[DataRequired(), Length(min=5, max=6)])