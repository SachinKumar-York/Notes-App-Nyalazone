import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from '../../../services/service-file'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  userpass: any = {};

  constructor(private commonService: CommonService, private router: Router, private toastr: ToastrService) {}

  onSignin(form: NgForm) {
    const payload = {
      user_name: this.userpass.email,
      user_pass: this.userpass.password
    };

    console.log("signin payload: ", payload);
    
    this.commonService.onSignIn(payload).subscribe(response => {

      if (response.errCode === 0) {
        console.log(response.msg);
        console.log('signin successful');
        this.toastr.success('signin successful')
        const user_id = response.datarec.user_id;
        localStorage.setItem('user_id', user_id);
        this.router.navigate(['/notes-management/note-wrapper']);
      } else {
        console.error("Error: Signin failed");
        this.toastr.error('Error: signin failed')
      }
    }); 
}}
