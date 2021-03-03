import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {
  ParsingService,
  MFTokenizationResult
} from '../services/parsing.service';

@Component({
  selector: 'app-parsing-result',
  templateUrl: './parsing-result.component.html',
  styleUrls: ['./parsing-result.component.scss']
})
export class ParsingResultComponent implements OnInit, OnChanges {
  @Input()
  public message: string;

  @Input()
  public lang: string;

  public analysis: MFTokenizationResult;

  constructor(private parsingService: ParsingService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.analysis = this.parsingService.tokenize(this.message, this.lang);
  }
}
