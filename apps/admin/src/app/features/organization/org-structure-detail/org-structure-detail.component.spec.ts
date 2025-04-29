import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrgStructureDetailComponent } from './org-structure-detail.component';

describe('OrgStructureDetailComponent', () => {
  let component: OrgStructureDetailComponent;
  let fixture: ComponentFixture<OrgStructureDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgStructureDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrgStructureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
