import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

interface CompanyGroup {
  name: string;
}

interface Level {
  name: string;
  fullPath: string; // e.g., "1", "1.1", "1.1.a"
  parent?: string; // Full path of the parent level (e.g., "1" for "1.1")
}

@Component({
  selector: 'app-organization-type',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule
  ],
  templateUrl: './organization-type.component.html',
  styleUrls: ['./organization-type.component.scss']
})
export class OrganizationTypeComponent implements OnInit {
  organizationTypeForm: FormGroup;
  groups: CompanyGroup[] = [{ name: 'QBS Pakistan' }];
  hierarchy: Level[] = []; // Start with an empty hierarchy
  selectedGroup: string | null = null; // Start with no selected group
  step: 'creation1' | 'creation2' = 'creation1';

  constructor(private fb: FormBuilder) {
    this.organizationTypeForm = this.fb.group({
      organizationTypeId: [{ value: '', disabled: true }],
      organizationTypeName: ['', Validators.required],
      level: [0, [Validators.required, Validators.min(0)]],
      effectiveDate: [''],
      description: [''],
      tag: ['']
    });
  }

  ngOnInit(): void {
    console.log('in oninit');
  }

  // Handle GOC selection change
  onGroupChange(): void {
    if (this.selectedGroup) {
      // If a GOC is selected, initialize the hierarchy with the GOC
      this.hierarchy = [];
    } else {
      // If no GOC is selected, clear the hierarchy
      this.hierarchy = [];
    }
  }

  viewDateTrack(): void {
    console.log('View Date Track clicked');
  }

  viewHierarchy(): void {
    console.log('View Hierarchy clicked');
  }

  cancel(): void {
    this.organizationTypeForm.reset({
      organizationTypeId: '',
      organizationTypeName: '',
      level: 0,
      effectiveDate: '',
      description: '',
      tag: ''
    });
  }

  save(): void {
    if (this.organizationTypeForm.valid) {
      const levelValue = this.organizationTypeForm.get('level')?.value;
      const levelName = `Level ${this.getLevelPath(levelValue)}`;
      const newLevel: Level = {
        name: levelName,
        fullPath: this.getLevelPath(levelValue),
        parent: this.getParentPath(levelValue)
      };

      if (!this.selectedGroup) {
        console.warn('Please select a Group of Company');
        return;
      }

      if (this.step === 'creation1') {
        // Initialize the hierarchy with the first level
        this.hierarchy = [newLevel];
        this.step = 'creation2';
      } else {
        // Add the new level to the hierarchy
        this.hierarchy.push(newLevel);
      }

      this.organizationTypeForm.reset({
        organizationTypeId: '',
        organizationTypeName: '',
        level: 0,
        effectiveDate: '',
        description: '',
        tag: ''
      });
    } else {
      this.organizationTypeForm.markAllAsTouched();
    }
  }

  // Helper to calculate the full path of a level (e.g., "1.1.a" for level 1.1.a)
  private getLevelPath(level: number): string {
    if (level === 0) return '1'; // Root level
    const levelStr = level.toString();
    const parts = levelStr.split('');
    return parts.join('.');
  }

  // Helper to determine the parent path of a level
  private getParentPath(level: number): string | undefined {
    if (level === 0) return undefined; // Root level has no parent
    const levelStr = level.toString();
    const parts = levelStr.split('');
    if (parts.length === 1) return undefined; // e.g., "1" has no parent
    return parts.slice(0, -1).join('.'); // e.g., "1.1" has parent "1"
  }
}