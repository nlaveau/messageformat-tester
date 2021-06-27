import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FileUploadFormComponent } from './file-upload-form.component';

describe('FileUploadFormComponent', () => {
  let component: FileUploadFormComponent;
  let fixture: ComponentFixture<FileUploadFormComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FileUploadFormComponent],
        providers: [FormBuilder]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the file name when loading it', () => {
    const file = new File([''], 'test.json');
    component.file = file;
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(
        By.css('[data-test=file-upload-form--filename]')
      )
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(
        By.css('[data-test=file-upload-form--filename]')
      ).nativeElement.textContent
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(
        By.css('[data-test=file-upload-form--filename]')
      ).nativeElement.textContent
    ).toBe('test.json');
  });
});
