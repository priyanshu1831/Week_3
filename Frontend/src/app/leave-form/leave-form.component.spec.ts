import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of,throwError } from 'rxjs';
import { LeaveFormComponent } from './leave-form.component';
import { DialogComponent } from './dialog.component';

describe('LeaveFormComponent', () => {
  let component: LeaveFormComponent;
  let fixture: ComponentFixture<LeaveFormComponent>;
  let mockMatDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule
      ],

      declarations: [LeaveFormComponent, DialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    mockMatDialog = TestBed.inject(MatDialog);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog on successful submission', fakeAsync(() => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });
    const dialogSpy = spyOn(mockMatDialog, 'open').and.returnValue(dialogRefSpyObj);

    // Populate the form with test values
    component.leaveForm.patchValue({
      employee_name: 'John Doe',
      leave_type: 'Casual',
      leave_from: new Date(),
      leave_to: new Date(),
      team_name: 'AWS',
      manager_name: 'Ranjan',
      file_path: '' 
    });

 

    // Mock a successful http.post response
    spyOn(component['http'], 'post').and.returnValue(of({}));

    // Trigger submission
    component.onSubmit();
    tick(); // Use to simulate asynchronous operations

    expect(dialogSpy).toHaveBeenCalledWith(DialogComponent, {
      data: { message: 'Data Saved Successfully' }
    });
  }));

});