import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrPage } from './ocr.page';

describe('OcrPage', () => {
  let component: OcrPage;
  let fixture: ComponentFixture<OcrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcrPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
