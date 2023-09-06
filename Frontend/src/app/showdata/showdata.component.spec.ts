import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ShowdataComponent } from './showdata.component';

describe('ShowdataComponent', () => {
  let component: ShowdataComponent;
  let fixture: ComponentFixture<ShowdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ShowdataComponent]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ShowdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

});