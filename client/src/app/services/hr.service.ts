import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HrService {
  baseUrl = "https://localhost:7110/api/";

  constructor(private http : HttpClient) { }

  getHrs() {
    return this.http.get(this.baseUrl + "hr");
  }
}
