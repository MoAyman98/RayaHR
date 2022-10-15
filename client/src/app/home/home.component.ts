import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { hr } from '../models/Hr';
import { HrService } from '../services/hr.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  modalRef?: BsModalRef;
  role: number;
  admin: boolean;
  Hrs :hr[];
  Hr : hr = {
    hrid: 0,
    name: '',
    salary: 0,
    hiringDate: undefined,
    status: ''
  };
  constructor(private hrService: HrService, private modalService: BsModalService, private toast: ToastrService, 
    private router: Router) { }

  ngOnInit() {
    this.role = JSON.parse(localStorage.getItem("user")).role;
    this.checkAdmin();
    this.getHrs();
  }

  getHrs() {
    this.hrService.getHrs().subscribe(hrs => {
      this.Hrs=hrs
    });
  }

  getHrById(id: number) {
    this.hrService.getHrById(id).subscribe(hr => this.Hr=hr);
  }

  deleteHr() {
    this.hrService.deleteHr(this.Hr.hrid).subscribe({
      next: () => {
      },
      error: () => {
        this.toast.success("Hr info deleted successfully");
        this.ngOnInit();
      }
    })
  }

  approveHr() {
    this.hrService.approveHr(this.Hr.hrid).subscribe({
      next: () => {
      },
      error: () => {
        this.toast.success("Hr approved successfully");
        this.ngOnInit();
      }
    })
  }

  checkAdmin() {
    if(this.role==1) {
      this.admin = true;
    } else {
      this.admin = false;
    }
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void {
    this.deleteHr();
    this.modalRef?.hide();
  }
 
  decline(): void {
    this.modalRef?.hide();
  }
}
