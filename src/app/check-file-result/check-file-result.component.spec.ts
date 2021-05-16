import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FileParseError } from '../models/file-parse-error';
import { By } from '@angular/platform-browser';

import { CheckFileResultComponent } from './check-file-result.component';
import { MatCardModule } from '@angular/material/card';

describe('CheckFileResultComponent', () => {
  let component: CheckFileResultComponent;
  let fixture: ComponentFixture<CheckFileResultComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CheckFileResultComponent],
        imports: [MatCardModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckFileResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if there are parse errors then show details', () => {
    component.parseErrors = [new FileParseError('test', 'test', 'test')];
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(
        By.css(`[data-test="check-file-result--errors"]`)
      )
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(
        By.css(`[data-test="check-file-result--no-errors-message"]`)
      )
    ).not.toBeTruthy();
  });

  it('if there are not parse errors then show message', () => {
    component.parseErrors = [];
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(
        By.css(`[data-test="check-file-result--errors"]`)
      )
    ).not.toBeTruthy();
    expect(
      fixture.debugElement.query(
        By.css(`[data-test="check-file-result--no-errors-message"]`)
      )
    ).toBeTruthy();
  });

  it('if there are not parse errors data available then hide content', () => {
    component.parseErrors = null;
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(
        By.css(`[data-test="check-file-result--errors"]`)
      )
    ).not.toBeTruthy();
    expect(
      fixture.debugElement.query(
        By.css(`[data-test="check-file-result--no-errors-message"]`)
      )
    ).not.toBeTruthy();
  });
});
