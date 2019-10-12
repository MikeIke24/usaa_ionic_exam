import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicReportPage } from './basic-report.page';

describe('BasicReportPage', () => {
  let component: BasicReportPage;
  let fixture: ComponentFixture<BasicReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
