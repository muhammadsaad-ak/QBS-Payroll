import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizationStructurePageComponent } from './organization-structure-page.component';

describe('OrganizationStructurePageComponent', () => {
  let component: OrganizationStructurePageComponent;
  let fixture: ComponentFixture<OrganizationStructurePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationStructurePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizationStructurePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
