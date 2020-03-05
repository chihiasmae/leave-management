import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisuliserMesCrasComponent } from './visuliser-mes-cras.component';

describe('VisuliserMesCrasComponent', () => {
  let component: VisuliserMesCrasComponent;
  let fixture: ComponentFixture<VisuliserMesCrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisuliserMesCrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisuliserMesCrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
