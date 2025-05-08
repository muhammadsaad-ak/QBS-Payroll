import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PraRoleComponent } from './pra-role.component';

describe('PraRoleComponent', () => {
  let component: PraRoleComponent;
  let fixture: ComponentFixture<PraRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PraRoleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PraRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
