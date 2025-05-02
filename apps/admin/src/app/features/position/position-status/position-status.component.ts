import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-position-status',
  templateUrl: './position-status.component.html',
  styleUrls: ['./position-status.component.scss'],
  standalone: true,
  imports: [
    CommonModule, // For *ngIf, *ngFor, [ngClass]
    ReactiveFormsModule, // For [formGroup]
    FormsModule, // For [(ngModel)]
    RouterModule // For routerLink
  ]
})
export class PositionStatusComponent implements OnInit {
  positionStatusForm: FormGroup;
  isFormCollapsed = false;
  positionStatuses: any[] = [];
  paginatedPositionStatuses: any[] = [];
  currentPage = 1;
  rowsPerPage = 10;
  totalPages = 1;

  constructor(private fb: FormBuilder) {
    this.positionStatusForm = this.fb.group({
      companyName: ['', Validators.required],
      positionStatusName: ['', Validators.required],
      positionStatusCode: [''],
      status: ['', Validators.required],
      description: [''],
      effectiveDate: ['', Validators.required],
      isDefault: [false],
      active: [true] // Default to true
    });
  }

  ngOnInit() {
    // Initialize with some dummy data if needed
    this.positionStatuses = []; // Populate this on save
    this.updatePagination();
  }

  onSubmit() {
    if (this.positionStatusForm.valid) {
      const newPositionStatus = this.positionStatusForm.value;
      this.positionStatuses.push(newPositionStatus);
      this.updatePagination();
      this.positionStatusForm.reset();
      this.positionStatusForm.patchValue({ isDefault: false, active: true });
    }
  }

  toggleFormCollapse() {
    this.isFormCollapsed = !this.isFormCollapsed;
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedPositionStatuses = this.positionStatuses.slice(start, end);
    this.totalPages = Math.ceil(this.positionStatuses.length / this.rowsPerPage);
  }

  changePage(direction: number) {
    this.currentPage += direction;
    this.updatePagination();
  }
}