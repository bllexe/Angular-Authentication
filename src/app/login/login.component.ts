import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userdata: any;

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {}

  loginForm = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  procedLogin() {
    if (this.loginForm.valid) {
      
        this.service.getByCode(this.loginForm.value.username).subscribe((res) => {
        this.userdata = res;
        console.log(this.userdata);
        if (this.userdata.password === this.loginForm.value.password) {
          if (this.userdata.isactive) {
            sessionStorage.setItem('username',this.userdata.id);
            sessionStorage.setItem('userrole',this.userdata.role);
            this.router.navigate(['']);
          } else {
            this.toastr.error('Please contact admin ', 'Inactive User');
          }
        } else {
          this.toastr.error('Invalid credetials');
        }
      });
    }
  }
}
