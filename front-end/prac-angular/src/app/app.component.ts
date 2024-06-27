// // import { Component } from '@angular/core';


// // export class AppComponent {
// //   title = 'prac-angular';
// // }

// import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
// import * as bootstrap from 'bootstrap';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })

// export class AppComponent {
  
//   }
// }
// export class AppComponent implements AfterViewInit {

  
//   @ViewChild('helloModal', {static: false}) helloEl!: ElementRef;
//   modal!: bootstrap.Modal;

//   ngAfterViewInit() {
//     if (this.helloEl) {
//       this.modal = new bootstrap.Modal(this.helloEl.nativeElement, {});
//     }
//   }

//   trigger() {
//     this.modal.show();
//   }

//   closeModal() {
//     this.modal.hide();
//   }
// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}

  handleNewUser(user: { email: string, password: string }) {
    console.log('New user registered:', user);
  }

  handleSignIn(user: { email: string, password: string }) {
    console.log('Sign in attempt:', user);
    if (user.email === 'example@example.com' && user.password === 'password') {
      this.router.navigate(['/dashboard']);
    } else {
      console.log('Invalid credentials. Sign in failed.');
    }
  }
}


