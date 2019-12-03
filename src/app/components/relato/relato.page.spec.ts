import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoPage } from './relato.page';

describe('RelatoPage', () => {
  let component: RelatoPage;
  let fixture: ComponentFixture<RelatoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
