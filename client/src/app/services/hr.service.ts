import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addHr } from '../models/addHr';
import { hr } from '../models/Hr';

@Injectable({
  providedIn: 'root'
})
export class HrService {
  baseUrl = "https://localhost:7110/api/";

  constructor(private http : HttpClient) { }

  getHrs() {
    return this.http.get<hr[]>(this.baseUrl + "hr");
  }

  getHrById(id:number) {
    return this.http.get<hr>(this.baseUrl + "hr/" + id);
  }

  deleteHr(id:number) {
    return this.http.delete(this.baseUrl + "hr/" + id);
  }

  approveHr(id:number) {
    return this.http.put(this.baseUrl + "hr/admin/" + id,"");
  }

  addHr(model : addHr) {
    return this.http.post(this.baseUrl + "hr",model);
  }
}
