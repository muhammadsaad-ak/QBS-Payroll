import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CostCenterService } from '../../../core/services/cost-center.service';
import { OrganizationService } from '../../../core/services/organization.service';
import { CostCenter, CostCenterResponse } from '../../../core/models/cost-center.model';
import { GroupOfCompany, GroupOfCompanyResponse } from '../../../core/models/organization.model';
import { CustomSearchableDropdownComponent } from '../../../shared/components/custom-searchable-dropdown/custom-searchable-dropdown.component';
import { DropdownOption } from '../../../core/models/dropdown-option.model';

@Component({
  selector: 'app-cost-center',
  templateUrl: './cost-center.component.html',
  styleUrls: ['./cost-center.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CustomSearchableDropdownComponent
  ]
})
export class CostCenterComponent implements OnInit, OnDestroy {
  costCenterForm: FormGroup;
  isFormCollapsed = false;
  costCenters: CostCenter[] = [];
  paginatedCostCenters: CostCenter[] = [];
  companies: GroupOfCompany[] = [];
  currentPage = 1;
  rowsPerPage = 10;
  totalPages = 1;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private costCenterService: CostCenterService,
    private organizationService: OrganizationService
  ) {
    this.costCenterForm = this.fb.group({
      costCenterId: [{ value: 'System-Generated', disabled: true }],
      name: ['', Validators.required],
      companyName: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.isFormCollapsed = false;
    this.loadCostCenters();
    this.loadCompanies();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  loadCostCenters() {
    const skip = (this.currentPage - 1) * this.rowsPerPage;
    const count = this.rowsPerPage;
    this.subscriptions.add(
      this.costCenterService.listCostCenters(skip, count).subscribe({
        next: (response: CostCenterResponse) => {
          this.costCenters = response.data.items || [];
          this.totalPages = Math.ceil(response.data.totalCount / this.rowsPerPage);
          this.updatePagination();
        },
        error: (err) => {
          console.error('Error loading cost centers:', err);
        }
      })
    );
  }

  loadCompanies() {
    this.subscriptions.add(
      this.organizationService.listCompanies(0, 100).subscribe({
        next: (response: GroupOfCompanyResponse) => {
          this.companies = response.items || [];
        },
        error: (err) => {
          console.error('Error loading companies:', err);
        }
      })
    );
  }

  onSubmit() {
    if (this.costCenterForm.valid) {
      const payload = {
        name: this.costCenterForm.get('name')?.value,
        companyID: this.getCompanyId(this.costCenterForm.get('companyName')?.value)
      };

      this.subscriptions.add(
        this.costCenterService.addCostCenter(payload).subscribe({
          next: (addedCostCenter) => {
            this.costCenters.push(addedCostCenter);
            this.totalPages = Math.ceil(this.costCenters.length / this.rowsPerPage);
            this.updatePagination();
            this.costCenterForm.reset();
            this.costCenterForm.patchValue({ costCenterId: 'System-Generated' });
          },
          error: (err) => {
            console.error('Error adding cost center:', err);
          }
        })
      );
    }
  }

  toggleFormCollapse() {
    this.isFormCollapsed = !this.isFormCollapsed;
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedCostCenters = this.costCenters.slice(start, end);
  }

  changePage(direction: number) {
    this.currentPage += direction;
    this.loadCostCenters();
  }

  getCompanyId(companyName: string): string {
    const company = this.companies.find(c => c.company_Name === companyName);
    return company ? company.id : '';
  }

  getDropdownOptions(): DropdownOption[] {
    return this.companies.map(company => ({
      value: company.company_Name,
      label: company.company_Name
    }));
  }

  getCompanyName(companyId: string): string {
    const company = this.companies.find(c => c.id === companyId);
    return company ? company.company_Name : 'Unknown';
  }
}