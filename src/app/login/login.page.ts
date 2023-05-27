import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null)
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    //implement in future
    this.router.navigate(['/home']);
    console.log('form', this.form.value);
  }
}
