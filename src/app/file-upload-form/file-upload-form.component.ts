import { Component, EventEmitter, Output } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { LanguageService } from '../services/language.service';
import { FileInfo } from '../models/file-info';

@Component({
  selector: 'app-file-upload-form',
  templateUrl: './file-upload-form.component.html',
  styleUrls: ['./file-upload-form.component.scss']
})
export class FileUploadFormComponent {
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public languages = this.languageService.getLang();
  public allowList: string[] = ['CORE'];
  file: File;

  public fileUploadForm = this.fb.group({
    language: [null, Validators.required],
    fileContent: [null, Validators.required],
    allowList: [this.allowList, Validators.required],
    rawFile: [null]
  });

  @Output()
  public submitFile = new EventEmitter<FileInfo>();

  @Output()
  public fileChange = new EventEmitter<FileInfo>();

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService
  ) {}

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsText(file, 'utf-8');

      reader.onload = () => {
        this.file = file;
        this.fileUploadForm.patchValue({
          fileContent: JSON.parse(reader.result.toString()),
          rawFile: file
        });
        this.fileChange.emit(this.fileUploadForm.value);
      };
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.allowList.push(value.trim());
      this.fileUploadForm.patchValue({ allowList: this.allowList });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(prefix: string): void {
    const index = this.allowList.indexOf(prefix);

    if (index >= 0) {
      this.allowList.splice(index, 1);
      this.fileUploadForm.patchValue({ allowList: this.allowList });
    }
  }

  checkFileFormat() {
    this.submitFile.emit(this.fileUploadForm.value);
  }
}
