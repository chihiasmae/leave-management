import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TousCongeComponent } from './tous-conge.component';

describe('TousCongeComponent', () => {
  let component: TousCongeComponent;
  let fixture: ComponentFixture<TousCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TousCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TousCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
