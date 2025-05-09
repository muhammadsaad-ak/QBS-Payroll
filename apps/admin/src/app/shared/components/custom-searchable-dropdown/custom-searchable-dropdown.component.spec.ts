import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSearchableDropdownComponent } from './custom-searchable-dropdown.component';

describe('CustomSearchableDropdownComponent', () => {
  let component: CustomSearchableDropdownComponent;
  let fixture: ComponentFixture<CustomSearchableDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSearchableDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSearchableDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
