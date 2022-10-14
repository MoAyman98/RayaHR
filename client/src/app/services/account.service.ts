import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from '../models/login';
import { map } from 'rxjs/operators'
import { response } from '../models/response';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "https://localhost:7110/api/";
  private currentUserSource = new ReplaySubject<response>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: login) {
    return this.http.post(this.baseUrl + 'Account/login',model).pipe(
      map((response: response) => {
        const user = response;
        if (user) {
          localStorage.setItem("user",JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  setCurrentUser(user: response) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
  }
}
