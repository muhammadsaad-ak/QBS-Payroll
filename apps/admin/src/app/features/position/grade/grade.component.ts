import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-grade',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './grade.component.html',
})
export class GradeComponent implements OnInit, OnDestroy {
  gradeForm: FormGroup;
  grades: any[] = [];
  isFormCollapsed = false;

  // Pagination properties
  currentPage = 1;
  rowsPerPage = 10;
  totalPages = 1;
  paginatedGrades: any[] = [];

  constructor(private fb: FormBuilder) {
    this.gradeForm = this.fb.group({
      companyName: ['', Validators.required],
      gradeAreaName: ['', Validators.required],
      effectiveDate: ['', Validators.required],
      active: [true]
    });
  }

  ngOnInit() {
    // Reset state on component initialization
    this.isFormCollapsed = false;
    this.grades = [];
    this.currentPage = 1;
    this.paginatedGrades = [];
    this.totalPages = 1;
    this.resetForm();
  }

  ngOnDestroy() {
    // Ensure animations can complete by resetting state
    this.isFormCollapsed = false;
  }

  toggleFormCollapse() {
    this.isFormCollapsed = !this.isFormCollapsed;
  }

  toggleActive() {
    const activeControl = this.gradeForm.get('active');
    activeControl?.setValue(!activeControl?.value);
  }

  onSubmit() {
    if (this.gradeForm.valid) {
      this.grades.push(this.gradeForm.value);
      this.updatePagination();
      this.resetForm();
    }
  }

  resetForm() {
    this.gradeForm.reset({
      companyName: '',
      gradeAreaName: '',
      effectiveDate: '',
      active: true
    });
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.grades.length / this.rowsPerPage);
    this.currentPage = Math.min(this.currentPage, this.totalPages);
    this.currentPage = Math.max(this.currentPage, 1);
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedGrades = this.grades.slice(start, end);
  }

  changePage(delta: number) {
    this.currentPage += delta;
    this.updatePagination();
  }
}