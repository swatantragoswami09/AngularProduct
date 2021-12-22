import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage =  '';
  private loginInfo: AuthLoginInfo;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }
  onSubmit() {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      (data: any) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username, data.id);
        this.authService.loginUser(data.accessToken);
        window.location.href = "/questions";
      },
      error => {
  this.isLoginFailed = true;
        console.log(error);
        this.errorMessage = error.error.message;
        ;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
