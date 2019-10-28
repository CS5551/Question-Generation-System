import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperCreatePage } from './paper-create.page';

describe('PaperCreatePage', () => {
  let component: PaperCreatePage;
  let fixture: ComponentFixture<PaperCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
