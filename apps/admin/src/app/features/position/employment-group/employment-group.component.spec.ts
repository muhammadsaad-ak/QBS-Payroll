import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmploymentGroupComponent } from './employment-group.component';

describe('EmploymentGroupComponent', () => {
  let component: EmploymentGroupComponent;
  let fixture: ComponentFixture<EmploymentGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmploymentGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmploymentGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
