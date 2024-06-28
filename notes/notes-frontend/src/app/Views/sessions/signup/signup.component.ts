import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignUp } from './signup';
import { CommonService } from '../../../services/service-file'
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  userpass: SignUp = new SignUp('', '');

  constructor(private commonService: CommonService, private router: Router, private toastr: ToastrService) {}
  
  onSignup(form: NgForm) {
    
    const payload = {
      user_name: this.userpass.email,
      user_pass: this.userpass.password
    };
    console.log("payload: ", payload);

  this.commonService.onSignUp(payload).subscribe(response => {

    if (response.errCode === 0) {
      console.log(response.msg);
      console.log('signup successful');
      this.toastr.success('signup successful');
      this.router.navigate(['/sessions/signin']);
    } else {
      console.error("Error: Signup failed");
      this.toastr.error('Error: Signup failed');
    }
  }); 
}}
