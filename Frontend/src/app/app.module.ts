import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { LeaveFormComponent } from './leave-form/leave-form.component';
import { ShowdataComponent } from './showdata/showdata.component';
import { DialogComponent } from './leave-form/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LeaveFormComponent, 
    ShowdataComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
