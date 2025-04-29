import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

interface CompanyGroup {
  name: string;
}

interface Level {
  name: string;
  fullPath: string; // e.g., "1", "1.1", "1.1.a"
  parent?: string; // Full path of the parent level (e.g., "1" for "1.1")
  organizationName?: string;
  organizationType?: string;
  costCenter?: string;
  parentOrganization?: string;
  effectiveDate?: string;
}

@Component({
  selector: 'app-org-structure-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './org-structure-detail.component.html',
  styleUrls: ['./org-structure-detail.component.scss']
})
export class OrgStructureDetailComponent implements OnInit {
  organizationStructureForm: FormGroup;
  groups: CompanyGroup[] = [{ name: 'QBS Pakistan' }];
  hierarchy: Level[] = []; // Start with an empty hierarchy
  selectedGroup: string | null = null; // Start with no selected group
  selectedLevel: Level | null = null; // Track the selected level for editing
  organizationTypes: string[] = ['Division']; // Static options for Organization Type dropdown
  costCenters: string[] = ['CC0001-IT']; // Static options for Cost Center dropdown
  parentOrganizations: string[] = ['QBS Global']; // Static options for Parent Organization dropdown

  constructor(private fb: FormBuilder) {
    this.organizationStructureForm = this.fb.group({
      organizationId: [{ value: '', disabled: true }],
      organizationName: ['', Validators.required],
      organizationType: [''],
      costCenter: [''],
      parentOrganization: [''],
      effectiveDate: ['']
    });
  }

  ngOnInit(): void {
    console.log('in oninit');
    // Simulate levels created in the "Organization Type" screen
    this.hierarchy = [
      { name: 'Level 1', fullPath: '1' },
      { name: 'Level 1.1', fullPath: '1.1', parent: '1' },
      { name: 'Level 1.1.a', fullPath: '1.1.a', parent: '1.1' },
      { name: 'Level 2', fullPath: '2' },
      { name: 'Level 2.1', fullPath: '2.1', parent: '2' },
      { name: 'Level 2.1.a', fullPath: '2.1.a', parent: '2.1' }
    ];
  }

  // Handle GOC selection change
  onGroupChange(): void {
    if (!this.selectedGroup) {
      this.hierarchy = [];
      this.selectedLevel = null;
      this.resetForm();
    }
  }

  // Handle level selection
  selectLevel(level: Level): void {
    this.selectedLevel = level;
    this.organizationStructureForm.patchValue({
      organizationId: level.fullPath, // Simulate system-generated ID
      organizationName: level.organizationName || '',
      organizationType: level.organizationType || '',
      costCenter: level.costCenter || '',
      parentOrganization: level.parentOrganization || '',
      effectiveDate: level.effectiveDate || ''
    });
  }

  viewDateTrack(): void {
    console.log('View Date Track clicked');
  }

  viewHierarchy(): void {
    console.log('View Hierarchy clicked');
  }

  cancel(): void {
    this.resetForm();
    this.selectedLevel = null;
  }

  save(): void {
    if (this.organizationStructureForm.valid && this.selectedLevel) {
      const formValue = this.organizationStructureForm.value;
      // Update the selected level with form values
      this.selectedLevel.organizationName = formValue.organizationName;
      this.selectedLevel.organizationType = formValue.organizationType;
      this.selectedLevel.costCenter = formValue.costCenter;
      this.selectedLevel.parentOrganization = formValue.parentOrganization;
      this.selectedLevel.effectiveDate = formValue.effectiveDate;

      // Update the hierarchy with the modified level
      const index = this.hierarchy.findIndex(level => level.fullPath === this.selectedLevel!.fullPath);
      if (index !== -1) {
        this.hierarchy[index] = { ...this.selectedLevel };
      }

      this.resetForm();
      this.selectedLevel = null;
    } else {
      this.organizationStructureForm.markAllAsTouched();
    }
  }

  private resetForm(): void {
    this.organizationStructureForm.reset({
      organizationId: '',
      organizationName: '',
      organizationType: '',
      costCenter: '',
      parentOrganization: '',
      effectiveDate: ''
    });
  }
}