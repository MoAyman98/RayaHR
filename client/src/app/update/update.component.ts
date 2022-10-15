import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { hr } from '../models/Hr';
import { HrService } from '../services/hr.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  id : any;
  Hr: hr={
    hrid: 0,
    name: '',
    salary: 0,
    hiringDate: undefined,
    status: ''
  };

  constructor(private route: ActivatedRoute, private hrService: HrService, private toast: ToastrService,
    private router: Router) {
    this.id =this.route.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.getHrById();
  }

  getHrById() {
    this.hrService.getHrById(this.id).subscribe(hr =>{this.Hr=hr;});
  }

  update() {
    this.hrService.updateHr(this.Hr).subscribe({
      next: () => {
      },
      error: () => {
        this.toast.success("Hr info updated successfully");
        this.router.navigateByUrl("/home");
      }
    })
  }
}
