import { Component, ElementRef, Input } from '@angular/core';
import { FileParseError } from '../models/file-parse-error';
import * as XLSX from 'xlsx';
import { FileInfo } from '../models/file-info';

@Component({
  selector: 'app-check-file-result',
  templateUrl: './check-file-result.component.html',
  styleUrls: ['./check-file-result.component.scss']
})
export class CheckFileResultComponent {
  displayedColumns: string[] = ['key', 'message', 'error'];
  ['data-test']: string;

  constructor(element: ElementRef) {
    this['data-test'] = element.nativeElement.getAttribute('data-test');
  }

  @Input()
  public parseErrors: FileParseError[];

  @Input()
  public fileInfo: FileInfo;

  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.parseErrors); //converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, this.getExportSheetName());
    XLSX.writeFile(wb, this.getExportFileName());
  }

  private getExportFileName() {
    const uploadedFileName = this.fileInfo.rawFile.name.split('.json')[0];
    return `${uploadedFileName}-parse-errors.xlsx`;
  }

  private getExportSheetName() {
    return this.fileInfo.language;
  }
}
