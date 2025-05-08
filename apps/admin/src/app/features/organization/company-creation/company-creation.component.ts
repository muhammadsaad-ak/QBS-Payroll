import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

interface CompanyGroup {
  name: string;
}

interface Company {
  name: string;
  parent?: string;
  isGroup?: boolean;
}

@Component({
  selector: 'app-company-creation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './company-creation.component.html',
  styleUrls: ['./company-creation.component.scss']
})
export class CompanyCreationComponent implements OnInit {
  companyForm: FormGroup;
  groups: CompanyGroup[] = [{ name: 'QBS Pakistan' }];
  hierarchy: Company[] = [];
  isActive = true;
  selectedGroup: string | null = null;
  uploadedLogo: { name: string, size: string } | null = null;
  step: 'creation1' | 'creation2' = 'creation1';

  constructor(private fb: FormBuilder) {
    this.companyForm = this.fb.group({
      companyId: [{ value: '', disabled: true }],
      companyName: ['', Validators.required],
      primaryCurrency: ['PKR', Validators.required],
      secondaryCurrency: ['PKR'],
      effectiveDate: [''],
      parentCompany: [true],
      parentCompanySelection: [{ value: '', disabled: false }]
    });

    // Enable/disable parentCompanySelection based on parentCompany toggle
    this.companyForm.get('parentCompany')?.valueChanges.subscribe(value => {
      const parentCompanySelectionControl = this.companyForm.get('parentCompanySelection');
      if (value) {
        parentCompanySelectionControl?.enable();
      } else {
        parentCompanySelectionControl?.disable();
        parentCompanySelectionControl?.setValue('');
      }
    });
  }

  ngOnInit(): void {
    console.log('in oninit');
  }

  onGroupChange(): void {
    if (this.selectedGroup) {
      this.hierarchy = [{ name: this.selectedGroup, isGroup: true }];
    } else {
      this.hierarchy = [];
    }
  }

  toggleActive(): void {
    this.isActive = !this.isActive;
  }

  viewDateTrack(): void {
    console.log('View Date Track clicked');
  }

  viewHierarchy(): void {
    console.log('View Hierarchy clicked');
  }

  cancel(): void {
    this.companyForm.reset({
      companyId: '',
      companyName: '',
      primaryCurrency: 'PKR',
      secondaryCurrency: 'PKR',
      effectiveDate: '',
      parentCompany: true,
      parentCompanySelection: ''
    });
    this.uploadedLogo = null;
  }

  save(): void {
    if (this.companyForm.valid) {
      const newCompany: Company = {
        name: this.companyForm.get('companyName')?.value,
        parent: this.selectedGroup || (this.companyForm.get('parentCompany')?.value ? this.companyForm.get('parentCompanySelection')?.value : undefined)
      };

      if (this.step === 'creation1') {
        if (this.selectedGroup) {
          this.hierarchy = [
            { name: this.selectedGroup, isGroup: true },
            { name: newCompany.name, parent: this.selectedGroup }
          ];
        } else if (this.companyForm.get('parentCompany')?.value) {
          const parent = this.companyForm.get('parentCompanySelection')?.value;
          if (parent) {
            this.hierarchy = [
              { name: parent },
              { name: newCompany.name, parent }
            ];
          } else {
            this.hierarchy = [{ name: newCompany.name }];
          }
        } else {
          this.hierarchy = [{ name: newCompany.name }];
        }
        this.step = 'creation2';
        this.uploadedLogo = { name: 'QBS_LOGO.jpg', size: '500kb' };
      } else {
        if (this.selectedGroup) {
          this.hierarchy.push({ name: newCompany.name, parent: this.selectedGroup });
        } else if (this.companyForm.get('parentCompany')?.value) {
          const parent = this.companyForm.get('parentCompanySelection')?.value;
          if (parent) {
            this.hierarchy.push({ name: newCompany.name, parent });
          } else {
            this.hierarchy.push({ name: newCompany.name });
          }
        } else {
          this.hierarchy.push({ name: newCompany.name });
        }
        this.uploadedLogo = { name: 'QBS_LOGO.jpg', size: '500kb' };
      }

      this.companyForm.reset({
        companyId: '',
        companyName: '',
        primaryCurrency: 'PKR',
        secondaryCurrency: 'PKR',
        effectiveDate: '',
        parentCompany: true,
        parentCompanySelection: ''
      });
    } else {
      this.companyForm.markAllAsTouched();
    }
  }

  getAvailableParents(): Company[] {
    // Return companies that can be parents (e.g., those without a parent or GOCs)
    return this.hierarchy.filter(item => !item.parent || item.isGroup);
  }
}