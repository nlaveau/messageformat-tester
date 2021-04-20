import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import {
  VariablesService,
  MFVar,
  VariableComparisonResult as VariablesComparisonResult
} from '../services/variables.service';
import { MessageVariables } from '../models/message-variables';
import { MessageInfo } from '../models/message-info';

@Component({
  selector: 'app-variables-form',
  templateUrl: './variables-form.component.html',
  styleUrls: ['./variables-form.component.scss']
})
export class VariablesFormComponent implements OnInit, OnChanges {
  @Input()
  message: MessageInfo;

  @Output()
  vars = new EventEmitter<MessageVariables>();

  public variableForm = this.fb.group({ one: null });

  public mfVars: MFVar[] = [];
  public comparison: VariablesComparisonResult;

  constructor(
    private fb: FormBuilder,
    private variablesService: VariablesService
  ) {}

  ngOnInit(): void {
    this.variableForm = this.fb.group({});
    this.variableForm.valueChanges.subscribe(v => {
      if (this.variableForm.valid) {
        this.vars.emit(v);
      }
    });
  }

  trackFn(index, item) {
    return item.name;
  }

  ngOnChanges() {
    const newVars = this.variablesService.extractVariables(
      this.message.destinationMessage
    );
    const newVarNames = newVars.map(aVar => aVar.name);
    for (const existingControlKey in this.variableForm.controls) {
      if (!newVarNames.includes(existingControlKey)) {
        this.variableForm.removeControl(existingControlKey);
      }
    }
    newVars.forEach(aVar => {
      if (!this.variableForm.controls[aVar.name]) {
        this.variableForm.addControl(aVar.name, new FormControl());
      }
    });
    this.mfVars = newVars;

    if (this.message.useSourceMessage) {
      const sourceVars = this.variablesService.extractVariables(
        this.message.sourceMessage
      );
      this.comparison = this.variablesService.compareVariables(
        sourceVars,
        newVars
      );
    }
  }
}
