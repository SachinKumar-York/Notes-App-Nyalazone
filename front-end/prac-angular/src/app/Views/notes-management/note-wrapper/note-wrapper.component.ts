import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/service-file'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-note-wrapper',
  templateUrl: './note-wrapper.component.html',
  styleUrls: ['./note-wrapper.component.css']
})
export class NoteWrapperComponent implements OnInit {
  notes_data: { note_title: string, note_desc: string, note_color: string, note_status?: string, note_id: number }[] = [];
  increment: number = 1;
  selected_note: { note_title: string, note_desc: string, note_color: string, note_id: number, note_status?: string } = { note_title: '', note_desc: '', note_color: '#ffffff', note_id: 0 };
  new_note_added: { note_title: string, note_desc: string, note_color: string, note_id: number, note_status?: string } = { note_title: '', note_desc: '', note_color: '#ffffff', note_id: 0 };

  constructor(private commonService: CommonService, private router: Router, private toastr: ToastrService) {}
  
  ngOnInit() {
    const user_id = parseInt(localStorage.getItem('user_id'), 10);
    if (user_id) {
      this.getAllNotes();
    }
  }

  addNote() {
    if (!this.new_note_added.note_title) {
      console.error('Title is required to add a note');
      this.toastr.error('Title is required to add a note');
      alert('Title is required to add a note');
      return;
    }
    if (!this.new_note_added.note_desc) {
      console.error('Description is required to add a note');
      this.toastr.error('Description is required to add a note');
      alert('Description is required to add a note');
      return;
    }   

    const payload = {
      note_title: this.new_note_added.note_title,
      note_desc: this.new_note_added.note_desc,
      note_color: this.new_note_added.note_color,
      user_id: parseInt(localStorage.getItem('user_id'))
    };

    console.log('add Payload:', payload);

    this.commonService.addNote(payload).subscribe(response => {
      if (response.errCode === 0) {
        this.manipulate_notes_data(response.datarec, 'add');
        console.log('Added Note Data:', response.datarec);
        this.toastr.success('Added Note');
        this.resetnewPayload();
      } else {
        console.error('Error in addition');
        this.toastr.error('Error in addition');
      }
    });
  }

  updateNote() {
    const index = this.notes_data.findIndex(note => note.note_id === this.selected_note.note_id);

    const payload = {
      note_title: this.selected_note.note_title,
      note_desc: this.selected_note.note_desc,
      note_color: this.selected_note.note_color,
      note_id: this.selected_note.note_id
    };

    console.log('updatePayload:', payload);

    this.commonService.updateNote(payload).subscribe(response => {
      if (response.errCode === 0) {
        this.manipulate_notes_data(response.datarec, 'update');
        if (index !== -1) {
          this.notes_data[index].note_title = payload.note_title;
          this.notes_data[index].note_desc = payload.note_desc;
          this.notes_data[index].note_color = payload.note_color;
        }
        console.log('Successfully updated:', response.msg);
        console.log('Updated Note ', response.datarec);
        this.toastr.success('Updated Note');
        this.closeModal();
        this.resetPayload();
      } else {
        console.error('Error in updation');
        this.toastr.error('Error in updation');
      }
    });
  }

  deleteNote() {
    const index = this.notes_data.findIndex(note => note.note_id === this.selected_note.note_id);

    const payload = {
      note_id: this.selected_note.note_id,
    };

    console.log('deletePayload:', payload);

    this.commonService.deleteNote(this.selected_note.note_id).subscribe(response => {
      if (response.errCode === 0) {
        this.manipulate_notes_data(response.datarec, 'delete');
        if (index !== -1) {
          this.notes_data.splice(index, 1);
        }
        console.log('Successfully deleted:', response.msg);
        console.log('Deleted Note Data:', response.datarec);
        this.toastr.success('Deleted Note');
        this.closeConfirmModal();
        this.closeModal();
        this.resetPayload();
      } else {
        console.error('Error in deletion');
        this.toastr.error('Error in deletion');
      }
    });
  }

  getAllNotes() {
    const payload = { 
      user_id: parseInt(localStorage.getItem('user_id')),
      note_status: ['Active']
    };

    console.log('Payload1:', payload);

    this.commonService.getAllNotes(payload).subscribe(response => {
      if (response.errCode === 0) {
        this.notes_data = response.notes;
        console.log('Successfully got all notes:', response.msg);
      } else {
        console.error('Error in getting all notes');
      }
    });
  }

  goToBins() {
    this.router.navigate(['/notes-management/bins']);
  }

  resetnewPayload() {
    this.new_note_added = { note_title: '', note_desc: '', note_color: '#ffffff', note_id: 0 };
  }

  resetPayload() {
    this.selected_note = { note_title: '', note_desc: '', note_color: '#ffffff', note_id: 0 };
  }

  openModal(note: any) {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
      this.selected_note = { ...note };
    }
  }

  closeModal() {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  openConfirmModal() {
    const confirmModalDiv = document.getElementById('confirmModal');
    if (confirmModalDiv != null) {
      confirmModalDiv.style.display = 'block';
    }
  }

  closeConfirmModal() {
    const confirmModalDiv = document.getElementById('confirmModal');
    if (confirmModalDiv != null) {
      confirmModalDiv.style.display = 'none';
    }
  }

  manipulate_notes_data(note_object: any, op: string) {
    const index = this.notes_data.findIndex(note => note.note_id === note_object.id);

    if (op === 'add') {
      console.log("mani-add: ", this.notes_data)
      this.notes_data.push(note_object);
      console.log("mani-add2: ", this.notes_data)
    } else if (op === 'update' && index !== -1) {
      this.notes_data[index] = note_object;
    } else if (op === 'delete' && index !== -1) {
      this.notes_data.splice(index, 1);
    }
  }
}
