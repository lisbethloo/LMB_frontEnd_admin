import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RPublicacionesComponent } from './r-publicaciones.component';

describe('RPublicacionesComponent', () => {
  let component: RPublicacionesComponent;
  let fixture: ComponentFixture<RPublicacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RPublicacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
