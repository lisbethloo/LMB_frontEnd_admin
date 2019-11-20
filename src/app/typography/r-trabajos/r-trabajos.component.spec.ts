import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RTrabajosComponent } from './r-trabajos.component';

describe('RTrabajosComponent', () => {
  let component: RTrabajosComponent;
  let fixture: ComponentFixture<RTrabajosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RTrabajosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RTrabajosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
