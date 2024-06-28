from resourcefile import *
from app import api

class Routes:
    api.add_resource(AddNote, '/add_note')
    api.add_resource(UpdateNote, '/update_note')
    api.add_resource(DeleteNote, '/delete_note')
    api.add_resource(OnSignUp, '/sign_up')
    api.add_resource(OnSignIn, '/sign_in')
    api.add_resource(GetAllNotes, '/get_all')
    api.add_resource(ChangeNoteStatus, '/change_note_status')
