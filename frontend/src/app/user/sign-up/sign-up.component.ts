import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../userInterface';
import { NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../user.service';
// import { NgForm } from '@angular/forms';

@Component({
  selector: 'netflux-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isDirty = true;
  userExists: boolean;
  constructor(private router: Router, private userService: UserService) { }
  userDetails: UserInterface = {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    favourites: [],
    // subscription: null,
    // card: null,
    password: null,
    confirmPassword: null,
    tnC: null
  };

  ngOnInit() {
  }
  isActive() {
    this.userService.getUser(this.userDetails.email) ? console.log() : console.log(false);
  }

  registerUser() {
    this.userService.registerUser(this.userDetails).subscribe((savedDetails) => {
      alert(`${savedDetails.firstName} you have registered successfully`);
      this.isActive();
      this.isDirty = false;
      this.router.navigate(['/home']);
      console.log(savedDetails);
    })
  }

  confirmPassword(confirmField) {
    this.userDetails.password === this.userDetails.confirmPassword ? confirmField.invalid = true : confirmField.invalid = false;
  }
  cancelSignUp() {
  }

  onSubmit(form: NgForm) {
    this.registerUser();
    // this.isActive ? console.log('email already exists') : this.registerUser();
  }
}
