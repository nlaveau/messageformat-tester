import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { TranslationResultComponent } from './translation-result/translation-result.component';
import { ParsingResultComponent } from './parsing-result/parsing-result.component';
import { VariablesFormComponent } from './variables-form/variables-form.component';
import { VariableFormComponent } from './variables-form/variable-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageFormComponent } from './message-form/message-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    TranslationResultComponent,
    ParsingResultComponent,
    VariableFormComponent,
    VariablesFormComponent,
    MessageFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
