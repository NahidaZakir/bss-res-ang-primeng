import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addEmployeeReqBody } from '../model/employee.model';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { SelectModule } from 'primeng/select';
import { IftaLabelModule } from 'primeng/iftalabel';
import { DatePickerModule } from 'primeng/datepicker';
import { ImagepreviewComponent } from '../imagepreview/imagepreview.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ImageService } from '../services/image.service';
interface Gender {
  name: string;
  code: string;
}
@Component({
  selector: 'app-addemployee',
  imports: [
    FormsModule,
    InputTextModule,
    FloatLabel,
    SelectModule,
    IftaLabelModule,
    DatePickerModule,
    ImagepreviewComponent,
    ButtonModule,
    RouterModule,
    Select,
    SpinnerComponent,
  ],
  templateUrl: './addemployee.component.html',
  styleUrl: './addemployee.component.css',
})
export class AddemployeeComponent implements OnInit {
  router = inject(Router);
  addEmployee: addEmployeeReqBody = new addEmployeeReqBody();
  selectedGender: Gender | undefined;
  genders: Gender[] | undefined;
  genderCode: number = 0;
  isLoading = false;

  constructor(
    private imageService: ImageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.genders = [
      { name: 'Male', code: '1' },
      { name: 'Female', code: '2' },
    ];
  }

  //ON submit of Employee
  onAddEmployee() {
    this.isLoading = true;
    this.convertToUTC();
    this.setImage();
    this.setGender();
    this.userService.createEmployee(this.addEmployee).subscribe((res: any) => {
      this.isLoading = false;
      this.imageService.resetImageInfo();
      this.router.navigateByUrl('/employees');
    });
  }

  setImage() {
    const imageInfo = this.imageService.getImageInfo();
    this.addEmployee.image = imageInfo[0];
    this.addEmployee.base64 = imageInfo[1];
  }

  setGender() {
    if (this.selectedGender) {
      this.genderCode = +this.selectedGender?.code;
    }
    this.addEmployee.genderId = this.genderCode;
  }
  //Converting date to UTC Format
  convertToUTC() {
    const dobUTC = new Date(this.addEmployee.dob).toISOString();
    const joinDateUTC = new Date(this.addEmployee.joinDate).toISOString();
    this.addEmployee.dob = dobUTC;
    this.addEmployee.joinDate = joinDateUTC;
  }
}
