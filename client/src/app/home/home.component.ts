import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  role: number;
  admin: boolean;
  constructor() { }

  ngOnInit(): void {
    this.role = JSON.parse(localStorage.getItem("user")).role;
    this.checkAdmin();
  }

  checkAdmin() {
    if(this.role==1) {
      this.admin = true;
    } else {
      this.admin = false;
    }
  }

}
