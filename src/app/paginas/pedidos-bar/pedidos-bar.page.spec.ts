import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidosBarPage } from './pedidos-bar.page';

describe('PedidosBarPage', () => {
  let component: PedidosBarPage;
  let fixture: ComponentFixture<PedidosBarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosBarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
