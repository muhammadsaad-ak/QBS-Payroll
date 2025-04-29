import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrgStructureTabsComponent } from './org-structure-tabs.component';

describe('OrgStructureTabsComponent', () => {
  let component: OrgStructureTabsComponent;
  let fixture: ComponentFixture<OrgStructureTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgStructureTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrgStructureTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
