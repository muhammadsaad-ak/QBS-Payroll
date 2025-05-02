import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-position-type',
  templateUrl: './position-type.component.html',
  styleUrls: ['./position-type.component.scss'],
  standalone: true,
  imports: [
    CommonModule, // For *ngIf, *ngFor, [ngClass]
    ReactiveFormsModule, // For [formGroup]
    FormsModule, // For [(ngModel)]
    RouterModule // For routerLink
  ]
})
export class PositionTypeComponent implements OnInit {
  positionTypeForm: FormGroup;
  isFormCollapsed = false;
  positionTypes: any[] = [];
  paginatedPositionTypes: any[] = [];
  currentPage = 1;
  rowsPerPage = 10;
  totalPages = 1;

  constructor(private fb: FormBuilder) {
    this.positionTypeForm = this.fb.group({
      companyName: ['', Validators.required],
      positionTypeName: ['', Validators.required],
      positionTypeCode: [''],
      effectiveDate: ['', Validators.required],
      description: [''],
      active: [true] // Default to true
    });
  }

  ngOnInit() {
    // Initialize with some dummy data if needed
    this.positionTypes = []; // Populate this on save
    this.updatePagination();
  }

  onSubmit() {
    if (this.positionTypeForm.valid) {
      const newPositionType = this.positionTypeForm.value;
      newPositionType.companyId = `COMP-${Math.floor(Math.random() * 1000)}`; // Example ID generation
      newPositionType.startDate = '15/04/2025'; // Example start date
      this.positionTypes.push(newPositionType);
      this.updatePagination();
      this.positionTypeForm.reset();
      this.positionTypeForm.patchValue({ active: true });
    }
  }

  toggleFormCollapse() {
    this.isFormCollapsed = !this.isFormCollapsed;
  }

  toggleActive() {
    const activeControl = this.positionTypeForm.get('active');
    activeControl?.setValue(!activeControl.value);
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedPositionTypes = this.positionTypes.slice(start, end);
    this.totalPages = Math.ceil(this.positionTypes.length / this.rowsPerPage);
  }

  changePage(direction: number) {
    this.currentPage += direction;
    this.updatePagination();
  }
}