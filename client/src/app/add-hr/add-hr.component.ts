import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { addHr } from '../models/addHr';
import { HrService } from '../services/hr.service';

@Component({
  selector: 'app-add-hr',
  templateUrl: './add-hr.component.html',
  styleUrls: ['./add-hr.component.css']
})
export class AddHrComponent implements OnInit {
  model: addHr ={
    name: '',
    salary: null
  };

  constructor(private hrService: HrService, private router: Router, private toast : ToastrService) { }

  ngOnInit(): void {
  }

  addNew() {
    this.hrService.addHr(this.model).subscribe({
      error: () => {
        this.toast.success("Hr added successfully");
        this.router.navigateByUrl("/home");
      }
    })
  }

}
