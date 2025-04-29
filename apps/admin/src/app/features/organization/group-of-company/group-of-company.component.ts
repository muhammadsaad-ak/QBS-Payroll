import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // For ngModel in pagination

interface CompanyGroup {
  code: string;
  name: string;
  primaryCurrency: string;
  secondaryCurrency?: string;
}

@Component({
  selector: 'app-group-of-company',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule // Add for ngModel in pagination
  ],
  templateUrl: './group-of-company.component.html',
  styleUrls: ['./group-of-company.component.scss']
})
export class GroupOfCompanyComponent implements OnInit {
  isTableVisible = false; // Table hidden by default
  existingGroups: CompanyGroup[] = []; // Initialize as empty array
  companyGroupForm: FormGroup;

  // Pagination properties
  currentPage = 1;
  pageSize = 10;
  totalRows = 0;
  totalPages = 1;

  constructor(private fb: FormBuilder) {
    this.companyGroupForm = this.fb.group({
      companyId: [{ value: '', disabled: true }],
      companyName: ['', Validators.required],
      primaryCurrency: ['', Validators.required],
      secondaryCurrency: ['']
    });
  }

  ngOnInit(): void {
    this.loadExistingGroups();
  }

  loadExistingGroups(): void {
    // Placeholder for future API call - no default data
    this.existingGroups = []; // Ensure it's empty
    this.totalRows = this.existingGroups.length;
    this.totalPages = Math.ceil(this.totalRows / this.pageSize) || 1; // Ensure totalPages is at least 1
  }

  saveGroup(): void {
    if (this.companyGroupForm.valid) {
      console.log('Form Value:', this.companyGroupForm.value);
      const newGroup: CompanyGroup = {
        code: 'QBS ' + String(this.existingGroups.length + 1).padStart(3, '0'), // Generate a new code
        name: this.companyGroupForm.get('companyName')?.value,
        primaryCurrency: this.companyGroupForm.get('primaryCurrency')?.value,
        secondaryCurrency: this.companyGroupForm.get('secondaryCurrency')?.value || undefined
      };
      this.existingGroups = [...this.existingGroups, newGroup];
      this.totalRows = this.existingGroups.length;
      this.totalPages = Math.ceil(this.totalRows / this.pageSize) || 1; // Ensure totalPages is at least 1
      this.isTableVisible = true; // Show the table after saving
      this.companyGroupForm.reset({
        companyId: '',
        companyName: '',
        primaryCurrency: '',
        secondaryCurrency: ''
      });
    } else {
      console.log('Form is invalid');
    }
  }

  cancel(): void {
    console.log('Cancel clicked');
    this.companyGroupForm.reset();
  }

  viewDateTrack(): void {
    console.log('View Date Track clicked');
  }

  // Pagination methods
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(): void {
    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }
}