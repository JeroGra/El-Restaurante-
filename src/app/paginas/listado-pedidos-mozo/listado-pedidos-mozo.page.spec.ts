import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoPedidosMozoPage } from './listado-pedidos-mozo.page';

describe('ListadoPedidosMozoPage', () => {
  let component: ListadoPedidosMozoPage;
  let fixture: ComponentFixture<ListadoPedidosMozoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPedidosMozoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
