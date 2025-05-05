import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
  standalone: true,
  imports: [
    CommonModule, // For *ngIf, *ngFor, [ngClass]
    ReactiveFormsModule, // For [formGroup]
    FormsModule, // For [(ngModel)]
    RouterModule // For routerLink
  ]
})
export class JobComponent implements OnInit {
  jobForm: FormGroup;
  isFormCollapsed = false;
  jobs: any[] = [];
  paginatedJobs: any[] = [];
  currentPage = 1;
  rowsPerPage = 10;
  totalPages = 1;
  jobIdCounter = 1; // For generating Job IDs

  constructor(private fb: FormBuilder) {
    this.jobForm = this.fb.group({
      jobId: [{ value: 'System-Generated', disabled: true }],
      jobTitle: ['', Validators.required],
      jobDescription: [''],
      effectiveDate: ['', Validators.required],
      active: [true] // Default to true
    });
  }

  ngOnInit() {
    // Initialize with some dummy data if needed
    this.jobs = []; // Populate this on save
    this.updatePagination();
  }

  onSubmit() {
    if (this.jobForm.valid) {
      const newJob = this.jobForm.getRawValue(); // Use getRawValue to include disabled fields
      // Generate Job ID in the format "Job-XXX"
      newJob.jobId = `Job-${this.jobIdCounter.toString().padStart(3, '0')}`;
      this.jobIdCounter++;
      this.jobs.push(newJob);
      this.updatePagination();
      this.jobForm.reset();
      this.jobForm.patchValue({ jobId: 'System-Generated', active: true });
    }
  }

  toggleFormCollapse() {
    this.isFormCollapsed = !this.isFormCollapsed;
  }

  toggleActive() {
    const activeControl = this.jobForm.get('active');
    activeControl?.setValue(!activeControl.value);
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedJobs = this.jobs.slice(start, end);
    this.totalPages = Math.ceil(this.jobs.length / this.rowsPerPage);
  }

  changePage(direction: number) {
    this.currentPage += direction;
    this.updatePagination();
  }
}