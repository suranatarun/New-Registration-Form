import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ViewFormComponent } from '../view-form/view-form.component';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { BackendService } from '../backend.service';
@Component({
  selector: 'app-save-form',
  templateUrl: './save-form.component.html',
  styleUrls: ['./save-form.component.css']
})
export class SaveFormComponent implements OnInit {
  SaveFormData: FormGroup;
  events: string[] = [];
  constructor(private dialog: MatDialog, private router: Router, private server: BackendService) { }
  maxDate = new Date();
  picker: any;
  FirstName: any;
  LastName: string;
  selectedGender: any;
  DateOfBirth: any;
  Age: number;
  AddressLine1: string;
  AddressLine2: string;
  PhoneNumber: number;
  Pincode: number;
  State: string;
  City: string;

  FirstNameError: any;
  LastNameError: any;
  selectedGenderError: any;
  DateOfBirthError: any;
  AgeError: any;
  AddressLine1Error: any;
  AddressLine2Error: any;
  PhoneNumberError: any;
  PincodeError: any;
  StateError: any;
  CityError: any;
  value: any;
  pincodeData: any;
  ngOnInit(): void {
    this.InitializationForm();
  }

  public InitializationForm(): any {
    this.SaveFormData = new FormGroup({
      FirstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      LastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      selectedGender: new FormControl('', [Validators.required]),
      DateOfBirth: new FormControl('', [Validators.required]),
      Age: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]),
      AddressLine1: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      AddressLine2: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      PhoneNumber: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]),
      Pincode: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(6)]),
      State: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      City: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    });
  }

  public CalAge(): any
  {
    const today = new Date();
    const birthDate = new Date(this.DateOfBirth);
    this.Age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate()))
    {
      this.Age--;
    }
    return this.Age;
  }

  public ViewForm(): any {
    this.router.navigate(['/view-Form']);
  }
  public FetchData(): any {
    const Pin = this.SaveFormData.value.Pincode;
    console.log(Pin);
    this.server.FetchData(Pin).subscribe((data: any) => {
      this.pincodeData = data;
      this.State = this.pincodeData?.[0]?.PostOffice[0]?.State;
      this.City = this.pincodeData?.[0]?.PostOffice[0]?.District;
    });
  }
  public SaveForm(): any {
    alert('You are successfully saved the form!');
    if (!this.FirstName) {
      this.FirstNameError = 'Please Enter FirstName';
    }
    else if (!this.LastName) {
      this.LastNameError = 'Please Enter LastName';
    }
    else if (!this.selectedGender) {
      this.selectedGenderError = 'Please select Gender';
    }
    else if (!this.DateOfBirth) {
      this.DateOfBirthError = 'Please Enter Date of Birth';
    }
    else if (!this.Age) {
      this.AgeError = 'Please Enter Age';
    }
    else if (!this.AddressLine1) {
      this.AddressLine1Error = 'Please Enter Address Line 1';
    }
    else if (!this.AddressLine2) {
      this.AddressLine2Error = 'Please Enter Address Line 2';
    }
    else if (!this.PhoneNumber) {
      this.PhoneNumberError = 'Please Enter Phone Number';
    }
    else if (!this.Pincode) {
      this.PincodeError = 'Please Enter Pincode';
    }
    else if (!this.State) {
      this.StateError = 'Please Enter State';
    }
    else if (!this.City) {
      this.CityError = 'Please Enter State';
    }
    else {
      const FormData = {
        FirstName: this.FirstName,
        LastName: this.LastName,
        selectedGender: this.selectedGender,
        DateOfBirth: this.DateOfBirth,
        Age: this.Age,
        AddressLine1: this.AddressLine1,
        AddressLine2: this.AddressLine2,
        PhoneNumber: this.PhoneNumber,
        Pincode: this.Pincode,
        State: this.State,
        City: this.City
    };
      localStorage.setItem('SaveData', JSON.stringify(FormData));
    }
  }
}
