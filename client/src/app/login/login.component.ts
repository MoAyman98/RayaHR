import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { login } from '../models/login';
import { response } from '../models/response';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: login;

  constructor(private accountService: AccountService, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
    this.model = {
      Email: '',
      Password: ''
    };
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: () => {
        this.toast.success("Logged in successfully");
        this.router.navigateByUrl("/home");
      },
      error: error => {
        this.toast.error(error.error);
      }
    })
  }

}
