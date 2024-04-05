import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { CommonServiceService } from '../load-service/common-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../load-service/auth.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [MessageService]
})
export class ViewComponent implements OnInit {
  Addemployee!: FormGroup
  departmentnames: any[] = ['Frontend', 'Backend', 'Testing', 'Finance'];
  education_details: any[] = ['10th', '12th', 'Diploma', 'Graduate', 'Post Graduate', 'Phd']
  token: any
  mode: any
  employeeID: any;
  isViewMode: boolean = true;


  constructor(
    private AFB: FormBuilder,
    private cs: CommonServiceService,
    private http: HttpClient,
    private messageservice: MessageService,
    private router: Router,
    private active: ActivatedRoute,
    private auth: AuthService) { }

  get firstname() {
    return this.Addemployee.get('firstname')
  }

  get lastname() {
    return this.Addemployee.get('lastname')
  }

  get email() {
    return this.Addemployee.get('email')
  }
  get phoneno() {
    return this.Addemployee.get('phoneno')
  }
  get login_id() {
    return this.Addemployee.get('login_id')
  }
  get password() {
    return this.Addemployee.get('password')
  }
  get confirmpassword() {
    return this.Addemployee.get('confirmpassword')
  }
  // get gender(){
  //   return this.Addemployee.get('gender')
  // }
  get departmentname() {
    return this.Addemployee.get('departmentname')
  }
  // get educationdetails()
  // {
  //   return this.Addemployee.get('edu_details')
  // }


  getempdata(employee_id: any) {
    const headers = { 'Authorization': this.token }
    this.cs.singleemp(employee_id,headers).subscribe(
      (response: any) => {
        console.log(response)
        console.log('education', response['employee']['edu_details']);
        let eduDetails = response['employee']['edu_details'];

        if (typeof eduDetails === 'string') {
          eduDetails = eduDetails.split(',')
            .map(detail => detail.trim().replace(/[{}"]/g, ''))
            .filter(detail => detail.trim() !== '');
        }
        const eduDetailsArray = this.Addemployee.get('edu_details') as FormArray;
        eduDetailsArray.clear();
        eduDetails.forEach((eduDetail: string) => {
          eduDetailsArray.push(this.AFB.control(eduDetail));
        });

        this.Addemployee.patchValue({
          firstname: response['employee']['firstname'],
          lastname: response['employee']['lastname'],
          email: response['employee']['email'],
          phoneno: response['employee']['phoneno'],
          login_id: response['employee']['login_id'],
          gender: response['employee']['gender'],
          departmentname: response['employee']['departmentname'],
          // edu_details: this.Addemployee.controls.edu_details.value
        });

        console.log('Form Control Value:', this.Addemployee.controls.edu_details.value);
      }
    );
  }



  ngOnInit() {
    this.token = localStorage.getItem('session_token')
    const headers = { 'Authorization': this.token }
    this.employeeID = this.active.snapshot.params['id']
    this.mode = this.active.snapshot.params['mode']

    this.Addemployee = this.AFB.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required]],
      phoneno: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      login_id: ['', [Validators.required,]],
      gender: [''],
      departmentname: ['', [Validators.required]],
      edu_details: this.AFB.array([])
    });

    switch (this.mode) {
      case 'view':
        this.getempdata(this.employeeID);
        // this.isViewMode = false;
        break
      case 'edit':
        this.getempdata(this.employeeID);
        break
    }

  }

  onChange(e: any) {
    const checkedvalue = e.target.value;
    const checked = e.target.checked;
    console.log(checkedvalue, checked)

    const checkedarray = this.Addemployee.get('edu_details') as FormArray;
    if (checked) {
      checkedarray.push(new FormControl(checkedvalue))
    }
    else {
      let i: number = 0;
      checkedarray.controls.forEach((item) => {
        if (item.value == checkedvalue) {
          checkedarray.removeAt(i);
        }
        i++
      });
    }
  }

  editbutton() {
    this.mode = 'edit'
    this.router.navigateByUrl('view-emp/' + this.employeeID + '/' + this.mode)
  }

  submitdata() {
    const headers = { 'Authorization': this.token }
    const updatedData = this.Addemployee.value;
    const employee_id = this.active.snapshot.params.id;

    this.cs.updateemp(employee_id, updatedData,headers).subscribe(
      response => {
        console.log(response)
        this.mode = 'view'
        this.router.navigateByUrl('view-emp/' + this.employeeID + '/' + this.mode)
        // this.messageservice.add({ severity: 'success', summary: 'success', detail: 'Employee detail updated', 'life': 3000 })
      },
      // (error => {
      //   console.log(error)
      //   // if (error) {
      //   //   this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Employee data Incorrect', 'life': 3000 })
      //   // }
      //   // else if(error.status === 401){
      //   //   this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Session expiered', 'life': 2000 });
      //   // }
      //   // else if(error.status === 500){
      //   //   this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Employee Id already exist, select different employee Id', 'life': 2000 });
      //   // }
      // })
    )
  }
  back() {
    this.router.navigateByUrl('/emp-list')
  }
  backtoview() {
    this.mode = 'view'
    this.router.navigateByUrl('view-emp/' + this.employeeID + '/' + this.mode)

  }
  cancel() {
    this.router.navigateByUrl('/emp-list')
  }
}
