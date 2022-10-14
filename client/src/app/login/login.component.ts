import { Component, OnInit } from '@angular/core';
import { login } from '../models/login';
import { response } from '../models/response';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: login = {
    Email: '',
    Password: ''
  };

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: () => {
        console.log("Logged in successfully");
        //   this.toast.success("Logged in successfully");
        //   this.router.navigateByUrl("/home");
      },
      error: error => {
        // this.toast.error(error.error);
        console.log(error.error)
      }
    })
  }

}
