import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  authority: string;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      return true;
    }
  }
}