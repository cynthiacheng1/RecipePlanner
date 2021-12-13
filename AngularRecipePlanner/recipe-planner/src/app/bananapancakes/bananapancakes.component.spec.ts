import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BananapancakesComponent } from './bananapancakes.component';

describe('BananapancakesComponent', () => {
  let component: BananapancakesComponent;
  let fixture: ComponentFixture<BananapancakesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BananapancakesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BananapancakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
