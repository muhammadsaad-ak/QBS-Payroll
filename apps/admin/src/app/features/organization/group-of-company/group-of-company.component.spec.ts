import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupOfCompanyComponent } from './group-of-company.component';

describe('GroupOfCompanyComponent', () => {
  let component: GroupOfCompanyComponent;
  let fixture: ComponentFixture<GroupOfCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupOfCompanyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupOfCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
