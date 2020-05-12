import { Component } from '@angular/core';
import { MessageInfo } from './models/message-info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'messageformat-tester';
  public lang = 'fr';

  public vars = { no: 1 };

  public message: MessageInfo = {
    language: 'en',
    destinationMessage: '',
    useSourceMessage: false,
    sourceMessage: undefined
  };

  public updateVars(variables: any) {
    this.vars = variables;
  }

  onMessageChange(messageFormResult) {
    this.message = messageFormResult;
  }

  $onInit() {
  }
}
