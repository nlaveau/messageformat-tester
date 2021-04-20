import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CheckFileResultComponent } from './check-file-result.component';

describe('CheckFileResultComponent', () => {
  let component: CheckFileResultComponent;
  let fixture: ComponentFixture<CheckFileResultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CheckFileResultComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckFileResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
