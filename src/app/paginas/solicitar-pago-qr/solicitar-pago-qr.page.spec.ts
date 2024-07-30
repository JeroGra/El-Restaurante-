import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitarPagoQrPage } from './solicitar-pago-qr.page';

describe('SolicitarPagoQrPage', () => {
  let component: SolicitarPagoQrPage;
  let fixture: ComponentFixture<SolicitarPagoQrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarPagoQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
