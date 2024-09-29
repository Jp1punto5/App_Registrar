import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LobbyDocentePage } from './lobby-docente.page';

describe('LobbyDocentePage', () => {
  let component: LobbyDocentePage;
  let fixture: ComponentFixture<LobbyDocentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyDocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
