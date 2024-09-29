import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LobbyAlumnoPage } from './lobby-alumno.page';

describe('LobbyAlumnoPage', () => {
  let component: LobbyAlumnoPage;
  let fixture: ComponentFixture<LobbyAlumnoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyAlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
