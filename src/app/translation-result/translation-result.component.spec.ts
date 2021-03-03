import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationResultComponent } from './translation-result.component';

describe('TranslationResultComponent', () => {
  let component: TranslationResultComponent;
  let fixture: ComponentFixture<TranslationResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TranslationResultComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
