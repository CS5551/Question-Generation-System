import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperListPage } from './paper-list.page';

describe('PaperListPage', () => {
  let component: PaperListPage;
  let fixture: ComponentFixture<PaperListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
