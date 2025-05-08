import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PositionService } from '../../../core/services/position.service';
import { OrganizationService } from '../../../core/services/organization.service';
import { Grade, GradeResponse } from '../../../core/models/grade.model';
import { GroupOfCompanyResponse } from '../../../core/models/organization.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grade',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './grade.component.html',
})
export class GradeComponent implements OnInit, OnDestroy {
  gradeForm: FormGroup;
  grades: Grade[] = [];
  companies: string[] = [];
  isFormCollapsed = false;

  // Pagination properties
  currentPage = 1;
  rowsPerPage = 10;
  totalPages = 1;
  paginatedGrades: Grade[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private positionService: PositionService,
    private organizationService: OrganizationService
  ) {
    this.gradeForm = this.fb.group({
      companyId: ['', Validators.required],
      gradeAreaName: ['', Validators.required],
      effectiveDate: ['', Validators.required],
      status: [true]
    });
  }

  ngOnInit() {
    this.isFormCollapsed = false;
    this.loadCompanies();
    this.loadGrades();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.isFormCollapsed = false;
  }

  toggleFormCollapse() {
    this.isFormCollapsed = !this.isFormCollapsed;
  }

  toggleActive() {
    const statusControl = this.gradeForm.get('status');
    statusControl?.setValue(!statusControl?.value);
  }

  onSubmit() {
    if (this.gradeForm.valid) {
      const gradeData: Grade = {
        id: '', // API will generate this
        companyId: this.gradeForm.get('companyId')?.value,
        effectiveDate: this.gradeForm.get('effectiveDate')?.value,
        gradeAreaName: this.gradeForm.get('gradeAreaName')?.value,
        status: this.gradeForm.get('status')?.value
      };
      this.subscriptions.add(
        this.positionService.addGrade(gradeData).subscribe({
          next: (addedGrade) => {
            this.grades.push(addedGrade);
            this.updatePagination();
            this.resetForm();
          },
          error: (err) => console.error('Error adding grade:', err)
        })
      );
    }
  }

  resetForm() {
    this.gradeForm.reset({
      companyId: '',
      gradeAreaName: '',
      effectiveDate: '',
      status: true
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

  private loadCompanies() {
    this.subscriptions.add(
      this.organizationService.listGroupOfCompanies(0, 100).subscribe({
        next: (response: GroupOfCompanyResponse) => {
          this.companies = response.items.map(company => company.company_Name); // Adjust based on actual response structure
        },
        error: (err) => console.error('Error loading companies:', err)
      })
    );
  }

  private loadGrades() {
    this.subscriptions.add(
      this.positionService.listGrades((this.currentPage - 1) * this.rowsPerPage, this.rowsPerPage).subscribe({
        next: (response: GradeResponse) => {
          this.grades = response.data;
          this.totalPages = Math.ceil(response.totalCount / this.rowsPerPage);
          this.updatePagination();
        },
        error: (err) => console.error('Error loading grades:', err)
      })
    );
  }
}