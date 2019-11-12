import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperEditPage } from './paper-edit.page';

describe('PaperEditPage', () => {
  let component: PaperEditPage;
  let fixture: ComponentFixture<PaperEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
