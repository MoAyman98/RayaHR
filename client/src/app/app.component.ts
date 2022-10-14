import { Component, OnInit } from '@angular/core';
import { response } from './models/response';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Raya';

  constructor(private accountService: AccountService){}

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user : response = JSON.parse(localStorage.getItem("user"));
    this.accountService.setCurrentUser(user);
  }
  
}
