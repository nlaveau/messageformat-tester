import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParsingResultComponent } from './parsing-result.component';

describe('ParsingResultComponent', () => {
  let component: ParsingResultComponent;
  let fixture: ComponentFixture<ParsingResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParsingResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParsingResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
