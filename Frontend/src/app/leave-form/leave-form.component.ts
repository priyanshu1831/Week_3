//Importing All Required Libraries

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';

//Declaring the component

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.css']
})


export class LeaveFormComponent implements OnInit {
  leaveForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.initializeForm();
    this.setFileValidator();
  }

  //Initializes the form

  initializeForm(): void {
    this.leaveForm = this.formBuilder.group({
      employee_name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      leave_type: ['', Validators.required],
      leave_from: ['', Validators.required],  
      leave_to: ['', Validators.required],
      team_name: ['', Validators.required],
      file: [''],
      manager_name: ['', Validators.required]
    }, {validators: this.dateRangeValidator});
  }

  //Function for Setting the File Validators

  setFileValidator(): void {
    const leaveTypeControl = this.leaveForm.get('leave_type');
    const fileControl = this.leaveForm.get('file');

    if (leaveTypeControl && fileControl) {
      leaveTypeControl.valueChanges.subscribe(value => {
        if (value === 'Sick') {
          fileControl.setValidators([Validators.required]);
        } else {
          fileControl.clearValidators();
        }
        fileControl.updateValueAndValidity();
      });
    } else {
      console.error('One or more form controls are missing.');
    }
  }

  //Function for Checking the Date Range

  dateRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const leaveFrom = control.get('leave_from');
    const leaveTo = control.get('leave_to');

    if (leaveFrom && leaveTo && leaveFrom.value && leaveTo.value) {
      const fromDate = new Date(leaveFrom.value);
      const toDate = new Date(leaveTo.value);

      if (fromDate > toDate) {
        return { dateRangeError: true };
      }
    }

    return null;
  };

  //Calling Onsubmit

  onSubmit(): void {
    if (this.leaveForm.valid) {
      this.submitData();
    }
  }

  //Initializing the submitData function which interacts with API and push data to api

  submitData(): void {
    if (this.leaveForm.valid) {
      const formData = new FormData();

      Object.keys(this.leaveForm.controls).forEach(key => {
        const controlValue = this.leaveForm.get(key)?.value;
        if (key === 'file' && controlValue) {
          formData.append(key, controlValue, controlValue.name);
        } else if (controlValue != null) {
          formData.append(key, controlValue);
        }
      });

      this.http.post('http://localhost:8080/postData', formData)
        .subscribe(
          (response: any) => {
            this.dialog.open(DialogComponent, {
              data: { message: 'Data Saved Successfully' }
            });
            this.leaveForm.reset();
          },
          error => {
            this.dialog.open(DialogComponent, {
              data: { message: 'Error submitting data: ' + error.message }
            });
            console.error('Error submitting data:', error);
          }
        );
    } else {
      console.error('Form is invalid');
    }
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.leaveForm.patchValue({
        file: file
      });
    }
  }

  //Getting File name and File Link

  getFileName(): string {
    const filePath = this.leaveForm.get('file')?.value;
    return filePath ? filePath.name : '';
  }

  getFileLink(): string | null {
    const filePath = this.leaveForm.get('file')?.value;
    return filePath ? filePath : null;
  }
}
