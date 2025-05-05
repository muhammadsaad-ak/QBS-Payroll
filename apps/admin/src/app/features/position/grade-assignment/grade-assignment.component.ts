import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-grade-assignment',
  templateUrl: './grade-assignment.component.html',
  styleUrls: ['./grade-assignment.component.scss'],
  standalone: true,
  imports: [
    CommonModule, // For *ngIf, *ngFor, [ngClass]
    ReactiveFormsModule, // For [formGroup]
    FormsModule, // For [(ngModel)]
    RouterModule // For routerLink
  ]
})
export class GradeAssignmentComponent implements OnInit {
  gradeAssignmentForm: FormGroup;
  isFormCollapsed = false;
  gradeAssignments: any[] = [];
  paginatedGradeAssignments: any[] = [];
  currentPage = 1;
  rowsPerPage = 10;
  totalPages = 1;

  constructor(private fb: FormBuilder) {
    this.gradeAssignmentForm = this.fb.group({
      companyName: ['', Validators.required],
      gradeArea: ['', Validators.required],
      gradeLevel: ['', Validators.required],
      combination: ['', Validators.required],
      minSalary: ['', Validators.required],
      maxSalary: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Initialize with some dummy data if needed
    this.gradeAssignments = []; // Populate this on save
    this.updatePagination();
  }

  onSubmit() {
    if (this.gradeAssignmentForm.valid) {
      const newGradeAssignment = this.gradeAssignmentForm.value;
      this.gradeAssignments.push(newGradeAssignment);
      this.updatePagination();
      this.gradeAssignmentForm.reset();
    }
  }

  toggleFormCollapse() {
    this.isFormCollapsed = !this.isFormCollapsed;
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedGradeAssignments = this.gradeAssignments.slice(start, end);
    this.totalPages = Math.ceil(this.gradeAssignments.length / this.rowsPerPage);
  }

  changePage(direction: number) {
    this.currentPage += direction;
    this.updatePagination();
  }
}