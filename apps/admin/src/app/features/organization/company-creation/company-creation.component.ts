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
  hierarchy: Company[] = []; // Start with an empty hierarchy
  isActive = true;
  selectedGroup: string | null = null; // Start with no selected group
  uploadedLogo: { name: string, size: string } | null = null;
  step: 'creation1' | 'creation2' = 'creation1';

  constructor(private fb: FormBuilder) {
    this.companyForm = this.fb.group({
      companyId: [{ value: '', disabled: true }],
      companyName: ['', Validators.required],
      typeOfCompany: [''],
      primaryCurrency: ['PKR', Validators.required],
      secondaryCurrency: ['PKR'],
      effectiveDate: [''],
      parentCompany: [true],
    });
  }

  ngOnInit(): void {
    console.log('in oninit');
  }

  // Handle GOC selection change
  onGroupChange(): void {
    if (this.selectedGroup) {
      // If a GOC is selected, add it to the hierarchy
      this.hierarchy = [{ name: this.selectedGroup, isGroup: true }];
    } else {
      // If no GOC is selected, clear the hierarchy
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
      typeOfCompany: '',
      primaryCurrency: 'PKR',
      secondaryCurrency: 'PKR',
      effectiveDate: '',
      parentCompany: true
    });
    this.uploadedLogo = null;
  }

  save(): void {
    if (this.companyForm.valid) {
      const newCompany: Company = {
        name: this.companyForm.get('companyName')?.value,
        parent: this.selectedGroup || (this.companyForm.get('parentCompany')?.value ? undefined : this.hierarchy[0]?.name)
      };

      if (this.step === 'creation1') {
        if (this.selectedGroup) {
          // If a GOC is selected, add the new company under it
          this.hierarchy = [
            { name: this.selectedGroup, isGroup: true },
            { name: newCompany.name, parent: this.selectedGroup }
          ];
        } else if (this.companyForm.get('parentCompany')?.value) {
          // If no GOC is selected and "Parent Company" is Yes, make it a standalone parent
          this.hierarchy = [{ name: newCompany.name }];
        } else {
          // If no GOC and "Parent Company" is No, we need a parent (this case should be handled based on requirements)
          console.warn('No parent selected and Parent Company is No');
          return;
        }
        this.step = 'creation2';
        this.uploadedLogo = { name: 'QBS_LOGO.jpg', size: '500kb' };
      } else {
        // In creation2, add the new company to the hierarchy
        if (this.selectedGroup) {
          this.hierarchy.push({ name: newCompany.name, parent: this.selectedGroup });
        } else if (this.companyForm.get('parentCompany')?.value) {
          this.hierarchy.push({ name: newCompany.name });
        } else {
          // Add as a child of the first company in the hierarchy (or adjust based on requirements)
          this.hierarchy.push({ name: newCompany.name, parent: this.hierarchy[0]?.name });
        }
        this.uploadedLogo = { name: 'QBS_LOGO.jpg', size: '500kb' };
      }

      this.companyForm.reset({
        companyId: '',
        companyName: '',
        typeOfCompany: '',
        primaryCurrency: 'PKR',
        secondaryCurrency: 'PKR',
        effectiveDate: '',
        parentCompany: true
      });
    } else {
      this.companyForm.markAllAsTouched();
    }
  }
}