import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckFileResultComponent } from '../check-file-result/check-file-result.component';
import { CheckMessageComponent } from '../check-message/check-message.component';
import { FileUploadFormComponent } from '../file-upload-form/file-upload-form.component';
import { FileInfo } from '../models/file-info';
import { FileParseError } from '../models/file-parse-error';

import { CheckFileComponent } from './check-file.component';

describe('CheckFileComponent', () => {
  let component: CheckFileComponent;
  let fixture: ComponentFixture<CheckFileComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          CheckFileComponent,
          FileUploadFormComponent,
          CheckFileResultComponent,
          CheckMessageComponent
        ],
        imports: [
          BrowserModule,
          FormsModule,
          BrowserAnimationsModule,
          ReactiveFormsModule,
          MatCardModule,
          MatInputModule,
          MatButtonModule,
          MatSelectModule,
          MatRadioModule,
          MatCheckboxModule,
          MatChipsModule,
          MatIconModule,
          MatTabsModule,
          MatTableModule
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove fileParseErrors on file change', () => {
    const fileInfo: FileInfo = {
      language: 'es',
      fileContent: {},
      allowList: ['CORE'],
      rawFile: new File([''], 'test')
    };
    component.fileParseErrors = [];
    component.onFileChange(fileInfo);
    expect(component.fileParseErrors).toBeNull();
  });

  it('should not show results if errors are not defined', () => {
    component.fileParseErrors = null;
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css(`[data-test=app-check-file--result]`))
    ).not.toBeTruthy();
  });

  it('should show results if errors array is empty', () => {
    component.fileParseErrors = [];
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css(`[data-test=app-check-file--result]`))
    ).toBeTruthy();
  });

  it('should show results if errors array has content', () => {
    component.fileParseErrors = [new FileParseError('test', 'test', 'test')];
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css(`[data-test=app-check-file--result]`))
    ).toBeTruthy();
  });

  it('submit form should trigger check file', () => {
    const form: FileUploadFormComponent = fixture.debugElement.query(
      By.css(`[data-test=app-check-file--form]`)
    )?.componentInstance;
    const spy = spyOn(component, 'onSubmitFile');
    form.submitFile.emit({
      language: 'es',
      fileContent: {},
      allowList: ['CORE'],
      rawFile: new File([''], 'test')
    });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
