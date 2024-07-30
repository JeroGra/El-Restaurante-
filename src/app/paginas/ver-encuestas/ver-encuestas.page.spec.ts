import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerEncuestasPage } from './ver-encuestas.page';

describe('VerEncuestasPage', () => {
  let component: VerEncuestasPage;
  let fixture: ComponentFixture<VerEncuestasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerEncuestasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
