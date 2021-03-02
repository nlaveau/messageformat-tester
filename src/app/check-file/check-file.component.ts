import { Component, OnInit } from '@angular/core';
import { FileInfo } from '../models/file-info';
import { FileParseError } from '../models/file-parse-error';
import { FileParsingService } from '../services/file-parsing.service';

@Component({
  selector: 'app-check-file',
  templateUrl: './check-file.component.html',
  styleUrls: ['./check-file.component.scss']
})
export class CheckFileComponent {
  public fileParseErrors: FileParseError[] = [];
  public fileInfo: FileInfo = null;

  constructor(private fileParsingService: FileParsingService) {}

  onFileChange(fileInfo: FileInfo) {
    this.fileInfo = fileInfo;
    this.fileParseErrors = this.fileParsingService.parseFile(fileInfo);
  }
}
