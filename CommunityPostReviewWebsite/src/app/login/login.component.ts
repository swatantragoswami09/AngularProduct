import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  info: any;
  tkn: any;
  registered: any;

  constructor(private token: TokenStorageService) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),

    };
    this.registered = parseInt(localStorage.getItem("usersno"));
    const tkn = this.info.token;
    console.log("token" + tkn);
    console.log(this.info.username);
  }


  logout() {
    this.token.signOut();
    window.location.reload();
  }

}
