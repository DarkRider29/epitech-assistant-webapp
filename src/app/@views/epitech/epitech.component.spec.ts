import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpitechComponent } from './epitech.component';

describe('EpitechComponent', () => {
  let component: EpitechComponent;
  let fixture: ComponentFixture<EpitechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpitechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpitechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
