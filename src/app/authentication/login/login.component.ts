import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  serverErrors = {
      wrongUser:  false,
      wrongPassword: false
    };
  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(

      private _formBuilder: FormBuilder,
      public router: Router,
      private authService: AuthService
  ) {}
  ngOnInit(): void {
      this.loginForm = this._formBuilder.group({
          email   : ['', [Validators.required, Validators.email]],
          clave: ['', Validators.required],
          rememberMe: false
      });
  }

  onSubmit(): void {
      if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        res => {
          this.authService.setToken(res['token']);
          this.router.navigateByUrl('/');
        },
        err => {
          this.serverErrors = err.error;
          console.log(this.serverErrors)
        }
      );
      //   this.router.navigate(['/']);
      }
    }
}
