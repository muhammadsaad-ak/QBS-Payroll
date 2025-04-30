import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PositionStatusComponent } from './position-status.component';

describe('PositionStatusComponent', () => {
  let component: PositionStatusComponent;
  let fixture: ComponentFixture<PositionStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionStatusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PositionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
