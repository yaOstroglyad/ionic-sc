import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegistrationPageService } from './registration-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.page.html',
  styleUrls: ['./registration-page.page.scss'],
})
export class RegistrationPagePage implements OnInit {

  form: FormGroup = new FormGroup({
    loginName: new FormControl(null),
    password: new FormControl(null),
    confirmPassword: new FormControl(null)
  });

  constructor(private registrationPageService: RegistrationPageService,
              private router: Router) { }

  ngOnInit(): void {
  }

  register(): void {
    // this.registrationPageService.register(this.form.value).subscribe(() => {
    //   this.backToLoginPage();
    // });
    this.backToLoginPage();
  }

  backToLoginPage() {
    this.router.navigate(['/login']);
  }
}
