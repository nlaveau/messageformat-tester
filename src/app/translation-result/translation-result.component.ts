import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  TranslationService,
  TranslationResult
} from '../services/translation.service';
import { MessageVariables } from '../models/message-variables';

@Component({
  selector: 'app-translation-result',
  templateUrl: './translation-result.component.html',
  styleUrls: ['./translation-result.component.scss']
})
export class TranslationResultComponent implements OnInit, OnChanges {
  @Input()
  public message: string;

  @Input()
  public vars: MessageVariables;

  @Input()
  public lang: string;

  public result: TranslationResult;

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.result = this.translationService.interpolate(
      this.message,
      this.lang,
      this.vars
    );
  }
}
