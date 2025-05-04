import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employment-group',
  templateUrl: './employment-group.component.html',
  styleUrls: ['./employment-group.component.scss'],
  standalone: true,
  imports: [
    CommonModule, // For *ngIf, *ngFor, [ngClass]
    ReactiveFormsModule, // For [formGroup]
    FormsModule, // For [(ngModel)]
    RouterModule // For routerLink
  ]
})
export class EmploymentGroupComponent implements OnInit {
  employmentGroupForm: FormGroup;
  isFormCollapsed = false;
  employmentGroups: any[] = [];
  paginatedEmploymentGroups: any[] = [];
  currentPage = 1;
  rowsPerPage = 10;
  totalPages = 1;

  constructor(private fb: FormBuilder) {
    this.employmentGroupForm = this.fb.group({
      companySelection: ['', Validators.required],
      categoryName: ['', Validators.required],
      effectiveDate: ['', Validators.required],
      active: [true] // Default to true
    });
  }

  ngOnInit() {
    // Initialize with some dummy data if needed
    this.employmentGroups = []; // Populate this on save
    this.updatePagination();
  }

  onSubmit() {
    if (this.employmentGroupForm.valid) {
      const newEmploymentGroup = this.employmentGroupForm.value;
      this.employmentGroups.push(newEmploymentGroup);
      this.updatePagination();
      this.employmentGroupForm.reset();
      this.employmentGroupForm.patchValue({ active: true });
    }
  }

  toggleFormCollapse() {
    this.isFormCollapsed = !this.isFormCollapsed;
  }

  toggleActive() {
    const activeControl = this.employmentGroupForm.get('active');
    activeControl?.setValue(!activeControl.value);
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedEmploymentGroups = this.employmentGroups.slice(start, end);
    this.totalPages = Math.ceil(this.employmentGroups.length / this.rowsPerPage);
  }

  changePage(direction: number) {
    this.currentPage += direction;
    this.updatePagination();
  }
}