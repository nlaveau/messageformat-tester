import { Component, ElementRef, OnInit } from '@angular/core';
import { FileInfo } from '../models/file-info';
import { FileParseError } from '../models/file-parse-error';
import { FileParsingService } from '../services/file-parsing.service';

@Component({
  selector: 'app-check-file',
  templateUrl: './check-file.component.html',
  styleUrls: ['./check-file.component.scss']
})
export class CheckFileComponent {
  public fileParseErrors: FileParseError[];
  public fileInfo: FileInfo = null;
  public ['data-test']: string;

  constructor(
    private fileParsingService: FileParsingService,
    element: ElementRef
  ) {
    this['data-test'] = element.nativeElement.getAttribute('data-test');
  }

  onFileChange(fileInfo: FileInfo) {
    this.fileInfo = fileInfo;
    this.fileParseErrors = null;
  }

  onSubmitFile(fileInfo: FileInfo) {
    this.fileParseErrors = this.fileParsingService.parseFile(fileInfo);
  }
}
