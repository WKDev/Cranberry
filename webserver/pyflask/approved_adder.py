import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate("apiKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL' : 'https://cranberry-f84d9-default-rtdb.firebaseio.com/'
})
app_users = db.reference('Approved_Users')

# Phone_number{
# Registered_date
# Visit_purpose
# Access_level
# Valid_until:



if __name__ == "__main__":
    app_users.push().set({
        'phone_num':'01090418986',
        'purpose':'elec'
    }) # update는 그냥 추가만 함
    specified_user = db.reference('Approved_Users').child('01011011010')
    print(app_users.get().keys())
    print(specified_user.get()['access_level'])

