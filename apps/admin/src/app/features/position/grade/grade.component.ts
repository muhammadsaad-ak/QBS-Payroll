import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GradeService } from '../../../core/services/grade.service';
import { OrganizationService } from '../../../core/services/organization.service';
import { Grade, GradeResponse } from '../../../core/models/grade.model';
import { GroupOfCompany, GroupOfCompanyResponse } from '../../../core/models/organization.model';
import { Pagination } from '../../../core/models/pagination.model';
import { PaginationService } from '../../../core/services/pagination.service';
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
  companies: GroupOfCompany[] = [];
  isFormCollapsed = false;
  filteredCompanies: GroupOfCompany[] = [];
  searchCompanyTerm = '';
  isCompanyDropdownOpen = false;

  // Pagination properties
  currentPage = 1;
  rowsPerPage = 10;
  pagination: Pagination = { currentPage: 1, rowsPerPage: 10, totalPages: 1, totalItems: 0 };
  paginatedGrades: Grade[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private gradeService: GradeService,
    private organizationService: OrganizationService,
    private paginationService: PaginationService
  ) {
    this.gradeForm = this.fb.group({
      companyName: ['', Validators.required],
      gradeAreaName: ['', Validators.required],
      effectiveDate: ['', Validators.required],
      active: [true]
    });
  }

  ngOnInit() {
    this.isFormCollapsed = false;
    this.loadGrades();
    this.loadCompanies();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.isFormCollapsed = false;
  }

  loadGrades() {
    const { skip, count } = this.paginationService.getSkipAndCount(this.currentPage, this.rowsPerPage);
    this.subscriptions.add(
      this.gradeService.listGrades(skip, count).subscribe({
        next: (response: GradeResponse) => {
          this.grades = response.data || [];
          this.pagination = this.paginationService.updatePagination(
            this.grades,
            this.currentPage,
            this.rowsPerPage,
            response.totalCount
          );
          this.updatePaginatedGrades();
        },
        error: (err) => {
          console.error('Error loading grades:', err);
          // this.toastService.showError('Failed to load grades. Please try again.');
        }
      })
    );
  }

  loadCompanies() {
    this.subscriptions.add(
      this.organizationService.listCompanies(0, 100).subscribe({
        next: (response: GroupOfCompanyResponse) => {
          this.companies = response.items || [];
          this.filteredCompanies = [...this.companies];
        },
        error: (err) => {
          console.error('Error loading companies:', err);
          // this.toastService.showError('Failed to load companies. Please try again.');
        }
      })
    );
  }

  onSearchCompany() {
    this.isCompanyDropdownOpen = true;
    this.filteredCompanies = this.companies.filter(company =>
      company.company_Name.toLowerCase().includes(this.searchCompanyTerm.toLowerCase())
    );
  }

  toggleCompanyDropdown() {
    this.isCompanyDropdownOpen = !this.isCompanyDropdownOpen;
    if (this.isCompanyDropdownOpen) {
      this.searchCompanyTerm = this.gradeForm.get('companyName')?.value || '';
      this.onSearchCompany();
    }
  }

  selectCompany(companyName: string) {
    this.gradeForm.get('companyName')?.setValue(companyName);
    this.isCompanyDropdownOpen = false;
    this.searchCompanyTerm = companyName;
  }

  toggleActive() {
    const activeControl = this.gradeForm.get('active');
    if (activeControl) {
      activeControl.setValue(!activeControl.value);
    }
  }

  toggleFormCollapse() {
    this.isFormCollapsed = !this.isFormCollapsed;
  }

  onSubmit() {
    if (this.gradeForm.valid) {
      const companyId = this.getCompanyId(this.gradeForm.get('companyName')?.value);
      if (!companyId) {
        console.error('Invalid company selected');
        // this.toastService.showError('Invalid company selected. Please select a valid company.');
        return;
      }

      const payload: Grade = {
        companyId: companyId,
        effectiveDate: this.gradeForm.get('effectiveDate')?.value,
        gradeAreaName: this.gradeForm.get('gradeAreaName')?.value,
        status: this.gradeForm.get('active')?.value
      };

      this.subscriptions.add(
        this.gradeService.addGrade(payload).subscribe({
          next: (addedGrade) => {
            this.grades.push(addedGrade);
            this.pagination = this.paginationService.updatePagination(
              this.grades,
              this.currentPage,
              this.rowsPerPage,
              this.pagination.totalItems + 1
            );
            this.updatePaginatedGrades();
            this.resetForm();
            // this.toastService.showSuccess('Grade added successfully!');
          },
          error: (err) => {
            console.error('Error adding grade:', err);
            // this.toastService.showError('Failed to add grade. Please try again.');
          }
        })
      );
    }
  }

  resetForm() {
    this.gradeForm.reset({
      companyName: '',
      gradeAreaName: '',
      effectiveDate: '',
      active: true
    });
    this.searchCompanyTerm = '';
    this.filteredCompanies = [...this.companies];
    this.isCompanyDropdownOpen = false;
  }

  updatePaginatedGrades() {
    this.paginatedGrades = this.grades.slice(
      (this.currentPage - 1) * this.rowsPerPage,
      this.currentPage * this.rowsPerPage
    );
  }

  changePage(delta: number) {
    this.currentPage += delta;
    this.loadGrades();
  }

  onRowsPerPageChange() {
    this.currentPage = 1;
    this.loadGrades();
  }

  getCompanyName(companyId: string): string {
    const company = this.companies.find(c => c.id === companyId);
    return company ? company.company_Name : 'Unknown';
  }

  private getCompanyId(companyName: string): string {
    const company = this.companies.find(c => c.company_Name === companyName);
    return company ? company.id : '';
  }
}