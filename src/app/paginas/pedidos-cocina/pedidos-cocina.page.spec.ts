import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidosCocinaPage } from './pedidos-cocina.page';

describe('PedidosCocinaPage', () => {
  let component: PedidosCocinaPage;
  let fixture: ComponentFixture<PedidosCocinaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosCocinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
