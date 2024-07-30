import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MesaClientePage } from './mesa-cliente.page';

describe('MesaClientePage', () => {
  let component: MesaClientePage;
  let fixture: ComponentFixture<MesaClientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MesaClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
