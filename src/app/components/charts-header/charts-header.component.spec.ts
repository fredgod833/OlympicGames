import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsHeaderComponent } from './charts-header.component';

describe('ChartsHeaderComponent', () => {
  let component: ChartsHeaderComponent;
  let fixture: ComponentFixture<ChartsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
