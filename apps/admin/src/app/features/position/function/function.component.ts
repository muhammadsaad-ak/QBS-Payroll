import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.scss'],
  standalone: true,
  imports: [
    CommonModule, // For *ngIf, *ngFor, [ngClass]
    ReactiveFormsModule, // For [formGroup]
    FormsModule, // For [(ngModel)]
    RouterModule // For routerLink
  ]
})
export class FunctionComponent implements OnInit {
  functionForm: FormGroup;
  isFormCollapsed = false;
  functions: any[] = [];
  paginatedFunctions: any[] = [];
  currentPage = 1;
  rowsPerPage = 10;
  totalPages = 1;
  functionIdCounter = 1; // For generating Function IDs

  constructor(private fb: FormBuilder) {
    this.functionForm = this.fb.group({
      functionId: [{ value: 'System-Generated', disabled: true }],
      functionName: ['', Validators.required],
      functionDescription: [''],
      effectiveDate: ['', Validators.required],
      active: [true] // Default to true
    });
  }

  ngOnInit() {
    // Initialize with some dummy data if needed
    this.functions = []; // Populate this on save
    this.updatePagination();
  }

  onSubmit() {
    if (this.functionForm.valid) {
      const newFunction = this.functionForm.getRawValue(); // Use getRawValue to include disabled fields
      // Generate Function ID in the format "Func-XXX"
      newFunction.functionId = `Func-${this.functionIdCounter.toString().padStart(3, '0')}`;
      this.functionIdCounter++;
      this.functions.push(newFunction);
      this.updatePagination();
      this.functionForm.reset();
      this.functionForm.patchValue({ functionId: 'System-Generated', active: true });
    }
  }

  toggleFormCollapse() {
    this.isFormCollapsed = !this.isFormCollapsed;
  }

  toggleActive() {
    const activeControl = this.functionForm.get('active');
    activeControl?.setValue(!activeControl.value);
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedFunctions = this.functions.slice(start, end);
    this.totalPages = Math.ceil(this.functions.length / this.rowsPerPage);
  }

  changePage(direction: number) {
    this.currentPage += direction;
    this.updatePagination();
  }
}