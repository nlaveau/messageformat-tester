import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LanguageService } from '../services/language.service';

import { MessageInfo } from '../models/message-info';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent {
  public languages = this.languageService.getLang();
  public useSourceMessage = false;

  public messageForm = this.fb.group({
    language: [null, Validators.required],
    sourceLanguage: null,
    sourceMessage: null,
    useSourceMessage: false,
    destinationMessage: [null, Validators.required]
  });

  @Output()
  public messageChange = new EventEmitter<MessageInfo>();

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService
  ) {
    this.messageForm.valueChanges.subscribe(v => {
      this.useSourceMessage = v.useSourceMessage;
      if (this.messageForm.valid) {
        this.messageChange.emit(v);
      }
    });
  }
}
