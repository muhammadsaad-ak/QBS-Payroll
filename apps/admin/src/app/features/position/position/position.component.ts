import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
  standalone: true,
  imports: [
    CommonModule, // For *ngIf, *ngFor, [ngClass]
    ReactiveFormsModule, // For [formGroup]
    FormsModule, // For [(ngModel)]
    RouterModule // For routerLink
  ]
})
export class PositionComponent implements OnInit {
  positionForm: FormGroup;
  isFormCollapsed = false;
  positions: any[] = [];
  paginatedPositions: any[] = [];
  currentPage = 1;
  rowsPerPage = 10;
  totalPages = 1;
  positionIdCounter = 1; // For generating Position IDs
  codeCounter = 1; // For generating Codes

  constructor(private fb: FormBuilder) {
    this.positionForm = this.fb.group({
      companyName: ['', Validators.required],
      positionId: [{ value: 'System-generated', disabled: true }],
      positionTitle: ['', Validators.required],
      organizationStructure: ['', Validators.required],
      function: ['', Validators.required],
      grade: ['', Validators.required],
      positionType: ['', Validators.required],
      fte: ['', Validators.required],
      probationPeriod: [''],
      probationUnit: [''],
      parentPosition: [''],
      costCenter: [''],
      location: [''],
      job: [''],
      positionStatus: [''],
      effectiveDate: [''],
      active: [true] // Default to true
    });
  }

  ngOnInit() {
    // Initialize with an empty positions array
    this.positions = [];
    this.updatePagination();
  }

  onSubmit() {
    if (this.positionForm.valid) {
      const newPosition = this.positionForm.getRawValue();
      // Generate Position ID and Code
      newPosition.positionId = `POS-${this.positionIdCounter++}`;
      newPosition.code = `P${this.codeCounter++}`;
      this.positions.push(newPosition);
      this.updatePagination();
      this.positionForm.reset();
      this.positionForm.patchValue({ positionId: 'System-generated', active: true });
    }
  }

  toggleFormCollapse() {
    this.isFormCollapsed = !this.isFormCollapsed;
  }

  toggleActive() {
    const activeControl = this.positionForm.get('active');
    activeControl?.setValue(!activeControl.value);
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedPositions = this.positions.slice(start, end);
    this.totalPages = Math.ceil(this.positions.length / this.rowsPerPage);
  }

  changePage(direction: number) {
    this.currentPage += direction;
    this.updatePagination();
  }
}