import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'netflux-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  log = {
    email: null,
    password: null
  };
  constructor(private router: Router, private userService: UserService) { }
  ngOnInit() {
  }
  logIn() {
    this.userService.authenticateUser(this.log.email, this.log.password).subscribe(user => console.log(user));
  }

  async onSubmit(logForm: NgForm) {
    this.logIn();
  }
}
