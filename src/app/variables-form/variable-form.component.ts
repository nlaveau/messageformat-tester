import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { MFVar } from '../services/variables.service';

@Component({
  selector: 'app-variable-form',
  templateUrl: './variable-form.component.html'
})
export class VariableFormComponent implements OnInit {
  @Input()
  variable: MFVar;

  @Input()
  form: FormGroup;

  constructor() {}

  ngOnInit(): void {
    //    console.log('adding variableform', this.form);
    //    this.form.registerControl(this.variable.name, new FormControl(''));
    //    console.log('registered');
  }

  get isValid() {
    return this.form.controls[this.variable.name].valid;
  }
}
