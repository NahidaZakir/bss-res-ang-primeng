import { Component, inject } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { loginReqBody, loginRespBody } from '../model/user.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { SpinnerComponent } from "../spinner/spinner.component";
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-login',
  imports: [FormsModule, PasswordModule, InputTextModule, SpinnerComponent, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 email: string | undefined;
 
  isLoading = false;
 loginObj: loginReqBody = new loginReqBody();
  //inject the userService to do API call
  userService = inject(UserService);
  router = inject(Router);

  onLogin() {
    console.log(this.loginObj);
    this.isLoading= true;
    this.userService.onLogin(this.loginObj).subscribe(
      (res: loginRespBody) => {
        //alert('user login success');
        localStorage.setItem('loginUserData', JSON.stringify(res))
        // localStorage.setItem('email', JSON.stringify(res.user.email))
        // localStorage.setItem('fullname', JSON.stringify(res.user.fullName))
        // localStorage.setItem('accesstoken', JSON.stringify(res.token))
        // localStorage.setItem('refreshtoken', JSON.stringify(res.refreshToken))
        // localStorage.setItem('refreshtokenexpiry', JSON.stringify(res.refreshTokenExpiryTime))
        this.router.navigateByUrl("/admin")
      },
      (error) => {
        alert('wrong user information');
         console.log("Inside error", this.loginObj);
         this.isLoading=false;
      }
    );
}
}
