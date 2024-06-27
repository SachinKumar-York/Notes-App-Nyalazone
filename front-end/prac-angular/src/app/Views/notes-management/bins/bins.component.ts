import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/service-file';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bins',
  templateUrl: './bins.component.html',
  styleUrls: ['./bins.component.css']
})
export class BinsComponent implements OnInit {
  bin_notes_data: { note_title: string, note_desc: string, note_color: string, note_status: string, note_id: number }[] = [];
  bin_selected_note: { note_title: string, note_desc: string, note_color: string, note_id: number, note_status: string } = { note_title: '', note_desc: '', note_color: '#ffffff', note_id: 0, note_status: 'Inactive' };

  constructor(private commonService: CommonService, private toastr: ToastrService) { }

  ngOnInit() {
    const user_id = parseInt(localStorage.getItem('user_id'), 10);
    if (user_id) {
      this.getAllInactiveNotes();
    }
  }

  getAllInactiveNotes() {
    const payload = { 
      user_id: parseInt(localStorage.getItem('user_id')),
      note_status: ['Inactive']
    };

    console.log('bins-getallnotes-Payload:', payload);

    this.commonService.getAllNotes(payload).subscribe(response => {
      if (response.errCode === 0) {
        this.bin_notes_data = response.notes;
        console.log('Successfully got all bin notes:', response.msg);
      } else {
        console.error('Error in getting all bin notes');
      }
    });
  }

  changeNoteStatus() {
    const payload = {
      note_id: this.bin_selected_note.note_id,
      note_status: 'Active'
    };
    console.log('bin payload: ', payload);

    this.commonService.changeNoteStatus(payload).subscribe(response => {
      if (response.errCode === 0) {
        const index = this.bin_notes_data.findIndex(note => note.note_id === this.bin_selected_note.note_id);
        if (index !== -1) {
          this.bin_notes_data.splice(index, 1);
        }
        this.toastr.success('Successfully restored the note');
        console.log('Successfully restored the note:', response.msg);
        this.closeConfirmModal();
        this.closeModal();
      } else {
        console.error('Error in restoring the note');
        this.toastr.error('Error in restoring the note');
        this.closeConfirmModal();
      }
    });
  }

  openModal(note: any) {
    const modelDiv = document.getElementById('myBinModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
      this.bin_selected_note = { ...note };
    }
  }

  closeModal() {
    const modelDiv = document.getElementById('myBinModal');
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
}
