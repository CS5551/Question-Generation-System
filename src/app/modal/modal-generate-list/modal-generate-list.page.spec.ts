import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGenerateListPage } from './modal-generate-list.page';

describe('ModalGenerateListPage', () => {
  let component: ModalGenerateListPage;
  let fixture: ComponentFixture<ModalGenerateListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalGenerateListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGenerateListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
