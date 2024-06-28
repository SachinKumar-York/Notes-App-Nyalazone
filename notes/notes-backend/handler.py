from flask import jsonify
from sqlalchemy.exc import SQLAlchemyError
from db import Notes, User, session

class Handler:
    @staticmethod
    def add_note(payload):
        try:
            new_note = Notes(
                note_title=payload.get('note_title'),
                note_desc=payload.get('note_desc'),
                note_color=payload.get('note_color', '#ffffff'),
                user_id=payload.get('user_id') 
            )
            #attr
            print("local user id:", new_note.user_id)
            print(new_note)
            session.add(new_note)
            session.commit()
            print('commit')
            return jsonify({'errCode': 0, 'message': 'Note added successfully', 'datarec': {'note_id': new_note.note_id, **payload}})
        except SQLAlchemyError as e:
            session.rollback()
            return jsonify({'errCode': 1, 'message': 'Failed to add note', 'error': str(e)})

    @staticmethod
    def update_note(payload):
        try:

            note_update_data = session.query(Notes).filter(Notes.note_id == payload.get('note_id')).first()
            if not note_update_data:
                return jsonify({'errCode': 1, 'message': 'Note not found'})
            
            if 'note_title' in payload:
                note_update_data.note_title = payload['note_title']
            if 'note_desc' in payload:
                note_update_data.note_desc = payload['note_desc']
            if 'note_color' in payload:
                note_update_data.note_color = payload['note_color']
            session.commit()
            return jsonify({'errCode': 0, 'message': 'Note updated successfully', 'datarec': {
                'note_id': note_update_data.note_id, 
                'note_title': note_update_data.note_title, 
                'note_desc': note_update_data.note_desc,
                'note_color': note_update_data.note_color, 
                'user_id': note_update_data.user_id
            }})
        except SQLAlchemyError as e:
            session.rollback()
            return jsonify({'errCode': 1, 'message': 'Failed to update note', 'error': str(e)})

    @staticmethod
    def delete_note(payload):
        print(payload)
        try:
            note_to_delete = session.query(Notes).filter(Notes.note_id == payload.get('note_id')).first()
            
            if not note_to_delete:
                return jsonify({'errCode': 1, 'message': 'Note not found'})
            note_to_delete.note_status = 'Inactive'
            session.commit()
            return jsonify({'errCode': 0, 'message': 'Note deleted successfully', 'datarec': {
                'note_id': note_to_delete.note_id, 
                'note_status': note_to_delete.note_status
            }})
        except SQLAlchemyError as e:
            session.rollback()
            return jsonify({'errCode': 1, 'message': 'Failed to delete note', 'error': str(e)})

    @staticmethod
    def signup_user(payload):
        try:
            new_user = User(
                user_name=payload.get('user_name'),
                user_pass=payload.get('user_pass')
            )
            session.add(new_user)
            session.commit()
            return jsonify({'errCode': 0, 'message': 'signed up successfully', 'payload': {**payload}})

        except SQLAlchemyError as e:
            session.rollback()
            return jsonify({'errCode': 1, 'message': 'Failed to sign up', 'error': str(e)})

    @staticmethod
    def signin_user(payload):
        try:            
            user_data = session.query(User).filter(
                User.user_name == payload.get('user_name'), 
                User.user_pass == payload.get('user_pass')
            ).first()
            
            print('userdata: ', user_data)
            if not user_data:
                return jsonify({'errCode': 1, 'message': 'User not found'})
            print('hi:')
            session.commit()    
            return jsonify({'errCode': 0, 'message': 'signed in successfully', 'datarec': {'user_id': user_data.user_id,**payload}})

        except SQLAlchemyError as e:
            session.rollback()
            return jsonify({'errCode': 1, 'message': 'Failed to sign in', 'error': str(e)})

    @staticmethod
    def getall_notes(payload):
        try:
            print("gat all payload: ",payload)
            note_statuses = payload.get('note_status')
            print("note_status: ",payload.get('note_status'))
            notes = session.query(Notes).filter(Notes.user_id == payload.get('user_id'), Notes.note_status.in_(note_statuses)).all()
            
            notes_list = [{'note_id': note.note_id, 'note_title': note.note_title, 'note_desc': note.note_desc, 'note_color': note.note_color} for note in notes]
            return jsonify({'errCode': 0, 'message': 'Got all notes successfully', 'notes': notes_list})
        except SQLAlchemyError as e:
            session.rollback()
            return jsonify({'errCode': 1, 'message': 'Failed to get all notes', 'error': str(e)})
        
    
    @staticmethod
    def change_note_status(payload):
        try:
            note_id = payload.get('note_id')
            new_status = payload.get('note_status')
            
            note = session.query(Notes).filter(Notes.note_id == note_id).first()
            if note:
                note.note_status = new_status
                session.commit()
                return jsonify({'errCode': 0, 'message': 'Restored note successfully'})
            else:
                return jsonify({'errCode': 1, 'message': 'Note not found'})

        except SQLAlchemyError as e:
            session.rollback()
            return jsonify({'errCode': 1, 'message': 'Failed to change note status', 'error': str(e)})
            