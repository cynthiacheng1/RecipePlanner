import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VegetablesoupComponent } from './vegetablesoup.component';

describe('VegetablesoupComponent', () => {
  let component: VegetablesoupComponent;
  let fixture: ComponentFixture<VegetablesoupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VegetablesoupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VegetablesoupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
