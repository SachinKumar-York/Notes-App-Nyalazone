from handler import Handler
from flask_restful import Resource
from flask import request, make_response

class AddNote(Resource):
    def post(self):
        payload = request.get_json()
        
        #payload
        print("payload:", payload)
        return Handler.add_note(payload)


class UpdateNote(Resource):
    def post(self):
        payload = request.get_json()
        return Handler.update_note(payload)

class DeleteNote(Resource):
    def post(self):
        payload = request.get_json()
        return Handler.delete_note(payload)


class OnSignUp(Resource):
    def post(self):
        payload = request.get_json()
        print("signuppayload: ", payload)
        return Handler.signup_user(payload)
    
    
class OnSignIn(Resource):
    def post(self):
        payload = request.get_json()
        print("signinpayload: ", payload)
        return Handler.signin_user(payload)
    
class GetAllNotes(Resource):
    def post(self):
        payload = request.get_json()
        print("getallnotes1: ", payload)
        return Handler.getall_notes(payload)
    


class ChangeNoteStatus(Resource):
    def post(self):
        payload = request.get_json()
        print("changenotepayload: ", payload)
        return Handler.change_note_status(payload)




# remove config from db_connection -> done
# master -> sachin ->frontend separately, backend separately
# frontend  env file, take all localhost etc there
# git ignore -> config, env