import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GradeLevelService } from '../../../core/services/grade-level.service';
import { OrganizationService } from '../../../core/services/organization.service';
import { GradeLevel, GradeLevelResponse } from '../../../core/models/grade-level.model';
import { GroupOfCompany, GroupOfCompanyResponse } from '../../../core/models/organization.model';
import { Pagination } from '../../../core/models/pagination.model';
import { PaginationService } from '../../../core/services/pagination.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grade-level',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './grade-level.component.html',
  styleUrls: ['./grade-level.component.scss']
})
export class GradeLevelComponent implements OnInit, OnDestroy {
  gradeLevelForm: FormGroup;
  gradeLevels: GradeLevel[] = [];
  companies: GroupOfCompany[] = [];
  filteredCompanies: GroupOfCompany[] = [];
  searchCompanyTerm = '';
  isFormCollapsed = false;

  // Pagination properties
  currentPage = 1;
  rowsPerPage = 10;
  pagination: Pagination = { currentPage: 1, rowsPerPage: 10, totalPages: 1, totalItems: 0 };
  paginatedGradeLevels: GradeLevel[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private gradeLevelService: GradeLevelService,
    private organizationService: OrganizationService,
    private paginationService: PaginationService
  ) {
    this.gradeLevelForm = this.fb.group({
      companyName: ['', Validators.required],
      gradeLevel: ['', Validators.required],
      effectiveDate: ['', Validators.required],
      active: [true]
    });
  }

  ngOnInit() {
    this.isFormCollapsed = false;
    this.loadGradeLevels();
    this.loadCompanies();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.isFormCollapsed = false;
  }

  loadGradeLevels() {
    const { skip, count } = this.paginationService.getSkipAndCount(this.currentPage, this.rowsPerPage);
    this.subscriptions.add(
      this.gradeLevelService.listGradeLevels(skip, count).subscribe({
        next: (response: GradeLevelResponse) => {
          console.log('API Response for grade levels:', response);
          // Ensure response.data.items is an array; fallback to empty array if not
          this.gradeLevels = Array.isArray(response.data.items) ? response.data.items : [];
          // Use totalCount from response.data, default to 0 if undefined
          const totalCount = response.data.totalCount || 0;
          this.pagination = this.paginationService.updatePagination(
            this.gradeLevels,
            this.currentPage,
            this.rowsPerPage,
            totalCount
          );
          // Ensure slicing only happens if gradeLevels is an array
          this.paginatedGradeLevels = Array.isArray(this.gradeLevels)
            ? this.gradeLevels.slice(
                (this.currentPage - 1) * this.rowsPerPage,
                this.currentPage * this.rowsPerPage
              )
            : [];
          console.log('Updated gradeLevels:', this.gradeLevels);
          console.log('Updated paginatedGradeLevels:', this.paginatedGradeLevels);
        },
        error: (err) => {
          console.error('Error loading grade levels:', err);
          // Reset gradeLevels and paginatedGradeLevels on error
          this.gradeLevels = [];
          this.paginatedGradeLevels = [];
          this.pagination = this.paginationService.updatePagination(
            this.gradeLevels,
            this.currentPage,
            this.rowsPerPage,
            0
          );
        }
      })
    );
  }

  loadCompanies() {
    this.subscriptions.add(
      this.organizationService.listCompanies(0, 100).subscribe({
        next: (response: GroupOfCompanyResponse) => {
          console.log('Raw API response for companies:', response);
          this.companies = response.items || [];
          this.filteredCompanies = [...this.companies];
          console.log('Loaded companies:', this.companies);
        },
        error: (err) => {
          console.error('Error loading companies:', err);
        }
      })
    );
  }

  onSearchCompany(event: Event) {
    const term = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchCompanyTerm = term;
    this.filteredCompanies = this.companies.filter(company =>
      company.company_Name.toLowerCase().includes(term)
    );
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
      console.log('Form submitted:', this.gradeLevelForm.value);
      const companyId = this.getCompanyId(this.gradeLevelForm.get('companyName')?.value);
      if (!companyId) {
        console.log('Invalid company selected. Please select a valid company.');
        return;
      }

      const payload: GradeLevel = {
        id: '',
        companyId: companyId,
        companyName: this.gradeLevelForm.get('companyName')?.value,
        gradeLevel: this.gradeLevelForm.get('gradeLevel')?.value,
        status: this.gradeLevelForm.get('active')?.value
      };

      this.subscriptions.add(
        this.gradeLevelService.addGradeLevel(payload).subscribe({
          next: (addedGradeLevel) => {
            this.gradeLevels.push(addedGradeLevel);
            this.pagination = this.paginationService.updatePagination(
              this.gradeLevels,
              this.currentPage,
              this.rowsPerPage,
              this.pagination.totalItems + 1
            );
            this.updatePaginatedGradeLevels();
            this.resetForm();
            console.log('Grade level added successfully:', addedGradeLevel);
          },
          error: (err) => {
            console.error('Error adding grade level:', err);
          }
        })
      );
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

  updatePaginatedGradeLevels() {
    this.paginatedGradeLevels = Array.isArray(this.gradeLevels)
      ? this.gradeLevels.slice(
          (this.currentPage - 1) * this.rowsPerPage,
          this.currentPage * this.rowsPerPage
        )
      : [];
  }

  changePage(delta: number) {
    this.currentPage += delta;
    this.loadGradeLevels();
  }

  onRowsPerPageChange() {
    this.currentPage = 1;
    this.loadGradeLevels();
  }

  getCompanyName(companyId: string): string {
    const company = this.companies.find(c => c.id === companyId);
    return company ? company.company_Name : 'Unknown';
  }

  private getCompanyId(companyName: string): string {
    const company = this.companies.find(c => c.company_Name === companyName);
    console.log("🚀 ~ GradeLevelComponent ~ getCompanyId ~ company:", company);
    return company ? company.id : '';
  }
}