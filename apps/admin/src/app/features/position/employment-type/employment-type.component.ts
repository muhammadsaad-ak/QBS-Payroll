import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employment-type',
  templateUrl: './employment-type.component.html',
  styleUrls: ['./employment-type.component.scss'],
  standalone: true,
  imports: [
    CommonModule, // For *ngIf, *ngFor, [ngClass]
    ReactiveFormsModule, // For [formGroup]
    FormsModule, // For [(ngModel)]
    RouterModule // For routerLink
  ]
})
export class EmploymentTypeComponent implements OnInit {
  employmentTypeForm: FormGroup;
  isFormCollapsed = false;
  employmentTypes: any[] = [];
  paginatedEmploymentTypes: any[] = [];
  currentPage = 1;
  rowsPerPage = 10;
  totalPages = 1;

  constructor(private fb: FormBuilder) {
    this.employmentTypeForm = this.fb.group({
      companySelection: ['', Validators.required],
      employmentType: ['', Validators.required],
      effectiveDate: ['', Validators.required],
      active: [true] // Default to true
    });
  }

  ngOnInit() {
    // Initialize with some dummy data if needed
    this.employmentTypes = []; // Populate this on save
    this.updatePagination();
  }

  onSubmit() {
    if (this.employmentTypeForm.valid) {
      const newEmploymentType = this.employmentTypeForm.value;
      this.employmentTypes.push(newEmploymentType);
      this.updatePagination();
      this.employmentTypeForm.reset();
      this.employmentTypeForm.patchValue({ active: true });
    }
  }

  toggleFormCollapse() {
    this.isFormCollapsed = !this.isFormCollapsed;
  }

  toggleActive() {
    const activeControl = this.employmentTypeForm.get('active');
    activeControl?.setValue(!activeControl.value);
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedEmploymentTypes = this.employmentTypes.slice(start, end);
    this.totalPages = Math.ceil(this.employmentTypes.length / this.rowsPerPage);
  }

  changePage(direction: number) {
    this.currentPage += direction;
    this.updatePagination();
  }
}