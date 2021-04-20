import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VariablesFormComponent } from './variables-form.component';

describe('VariablesFormComponent', () => {
  let component: VariablesFormComponent;
  let fixture: ComponentFixture<VariablesFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VariablesFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariablesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
