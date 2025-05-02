import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cost-center',
  templateUrl: './cost-center.component.html',
  styleUrls: ['./cost-center.component.scss'],
  standalone: true,
  imports: [
    CommonModule, // For *ngIf, *ngFor, [ngClass]
    ReactiveFormsModule, // For [formGroup]
    FormsModule, // For [(ngModel)]
    RouterModule // For routerLink
  ]
})
export class CostCenterComponent implements OnInit {
  costCenterForm: FormGroup;
  isFormCollapsed = false;
  costCenters: any[] = [];
  paginatedCostCenters: any[] = [];
  currentPage = 1;
  rowsPerPage = 10;
  totalPages = 1;

  constructor(private fb: FormBuilder) {
    this.costCenterForm = this.fb.group({
      costCenterId: [{ value: 'System-Generated', disabled: true }],
      name: ['', Validators.required],
      companyName: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Initialize with some dummy data if needed
    this.costCenters = []; // Populate this on save
    this.updatePagination();
  }

  onSubmit() {
    if (this.costCenterForm.valid) {
      const newCostCenter = this.costCenterForm.value;
      newCostCenter.costCenterId = `CC${Math.floor(Math.random() * 1000)}-${newCostCenter.name.split(' ')[0]}`; // Example ID generation
      this.costCenters.push(newCostCenter);
      this.updatePagination();
      this.costCenterForm.reset();
      this.costCenterForm.patchValue({ costCenterId: 'System-Generated' });
    }
  }

  toggleFormCollapse() {
    this.isFormCollapsed = !this.isFormCollapsed;
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedCostCenters = this.costCenters.slice(start, end);
    this.totalPages = Math.ceil(this.costCenters.length / this.rowsPerPage);
  }

  changePage(direction: number) {
    this.currentPage += direction;
    this.updatePagination();
  }
}