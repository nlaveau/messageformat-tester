import { Component, OnInit } from '@angular/core';
import { MessageInfo } from '../models/message-info';

@Component({
  selector: 'app-check-message',
  templateUrl: './check-message.component.html',
  styleUrls: ['./check-message.component.scss']
})
export class CheckMessageComponent implements OnInit {
  constructor() {}

  public vars = { no: 1 };

  public message: MessageInfo = {
    language: 'en',
    destinationMessage: '',
    useSourceMessage: false,
    sourceMessage: undefined,
    sourceLanguage: 'en'
  };

  public updateVars(variables: any) {
    this.vars = variables;
  }

  onMessageChange(messageFormResult) {
    this.message = messageFormResult;
  }

  ngOnInit(): void {}
}
