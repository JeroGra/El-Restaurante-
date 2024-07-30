import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AprobacionClientesPage } from './aprobacion-clientes.page';

describe('AprobacionClientesPage', () => {
  let component: AprobacionClientesPage;
  let fixture: ComponentFixture<AprobacionClientesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobacionClientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
