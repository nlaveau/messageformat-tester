import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckFileComponent } from './check-file.component';

describe('CheckFileComponent', () => {
  let component: CheckFileComponent;
  let fixture: ComponentFixture<CheckFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckFileComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
