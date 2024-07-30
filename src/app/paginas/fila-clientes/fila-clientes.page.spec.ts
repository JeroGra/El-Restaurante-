import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilaClientesPage } from './fila-clientes.page';

describe('FilaClientesPage', () => {
  let component: FilaClientesPage;
  let fixture: ComponentFixture<FilaClientesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FilaClientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
