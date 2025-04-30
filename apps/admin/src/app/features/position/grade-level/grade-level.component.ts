import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-grade-level',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './grade-level.component.html',
  styleUrls: ['./grade-level.component.scss']
})
export class GradeLevelComponent implements OnInit, OnDestroy {
  gradeLevelForm: FormGroup;
  gradeLevels: any[] = [];
  isFormCollapsed = false;

  // Pagination properties
  currentPage = 1;
  rowsPerPage = 10;
  totalPages = 1;
  paginatedGradeLevels: any[] = [];

  constructor(private fb: FormBuilder) {
    this.gradeLevelForm = this.fb.group({
      companyName: ['', Validators.required],
      gradeLevel: ['', Validators.required],
      effectiveDate: ['', Validators.required],
      active: [true]
    });
  }

  ngOnInit() {
    // Initialize with empty gradeLevels to hide the table by default
    this.isFormCollapsed = false;
    this.gradeLevels = []; // Start with an empty array
    this.currentPage = 1;
    this.paginatedGradeLevels = [];
    this.totalPages = 1;
    this.updatePagination();
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
    const activeControl = this.gradeLevelForm.get('active');
    activeControl?.setValue(!activeControl?.value);
  }

  onSubmit() {
    if (this.gradeLevelForm.valid) {
      this.gradeLevels.push(this.gradeLevelForm.value);
      this.updatePagination();
      this.resetForm();
    }
  }

  resetForm() {
    this.gradeLevelForm.reset({
      companyName: '',
      gradeLevel: '',
      effectiveDate: '',
      active: true
    });
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.gradeLevels.length / this.rowsPerPage);
    this.currentPage = Math.min(this.currentPage, this.totalPages);
    this.currentPage = Math.max(this.currentPage, 1);
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedGradeLevels = this.gradeLevels.slice(start, end);
  }

  changePage(delta: number) {
    this.currentPage += delta;
    this.updatePagination();
  }
}