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
import { MessageInfo } from '../models/message-info';

@Component({
  selector: 'app-translation-result',
  templateUrl: './translation-result.component.html',
  styleUrls: ['./translation-result.component.scss']
})
export class TranslationResultComponent implements OnInit, OnChanges {
  @Input()
  public message: MessageInfo;

  @Input()
  public vars: MessageVariables;

  public result: TranslationResult;
  public sourceResult: TranslationResult;

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.result = this.translationService.interpolate(
      this.message.destinationMessage,
      this.message.language,
      this.vars
    );
    if (this.message?.useSourceMessage) {
      this.sourceResult = this.translationService.interpolate(
        this.message.sourceMessage,
        this.message.sourceLanguage,
        this.vars
      );
    }
  }
}
