import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PositionTypeComponent } from './position-type.component';

describe('PositionTypeComponent', () => {
  let component: PositionTypeComponent;
  let fixture: ComponentFixture<PositionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionTypeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PositionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
