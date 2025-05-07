import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationService } from '../../../core/services/organization.service';
import { GroupOfCompanyListItem } from '../../../core/models/organization.model';
import { CurrencyService } from '../../../core/services/currency.service';
import { Currency } from '../../../core/models/currency.model';

@Component({
  selector: 'app-group-of-company',
  standalone: true,
  templateUrl: './group-of-company.component.html',
  imports: [FormsModule, ReactiveFormsModule, CommonModule]
})
export class GroupOfCompanyComponent implements OnInit {
  companyGroupForm: FormGroup;
  isTableVisible = true;
  existingGroups: GroupOfCompanyListItem[] = [];
  currencies: Currency[] = [];
  currentPage = 1;
  pageSize = 10;
  totalRows = 0;
  totalPages = 1;

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private currencyService: CurrencyService
  ) {
    this.companyGroupForm = this.fb.group({
      companyId: [{ value: '', disabled: true }],
      companyName: ['', Validators.required],
      primaryCurrency: ['', Validators.required],
      secondaryCurrency: [''],
    });
  }

  ngOnInit(): void {
    this.loadGroups();
    this.loadCurrencies();
  }

  loadCurrencies(): void {
    this.currencyService.listAllCurrencies().subscribe({
      next: (currencies) => {
        console.log('Currencies loaded:', currencies);
        this.currencies = currencies;
      },
      error: (error) => {
        console.error('Failed to load currencies:', error);
        this.currencies = [];
      }
    });
  }

  loadGroups(): void {
    this.organizationService.listGroupOfCompanies(0, 10).subscribe({
      next: (groups) => {
        this.existingGroups = groups;
        this.totalRows = groups.length;
        this.totalPages = Math.ceil(this.totalRows / this.pageSize);
        this.currentPage = 1;
      },
      error: (error) => {
        console.error('Failed to load groups:', error);
        this.existingGroups = [];
        this.totalRows = 0;
        this.totalPages = 1;
      }
    });
  }

  saveGroup(): void {
    if (this.companyGroupForm.valid) {
      const payload = {
        company_Name: this.companyGroupForm.get('companyName')?.value,
        primary_Currency: this.companyGroupForm.get('primaryCurrency')?.value,
        secondary_Currency: this.companyGroupForm.get('secondaryCurrency')?.value || undefined,
      };

      this.organizationService.addGroupOfCompany(payload).subscribe({
        next: () => {
          this.companyGroupForm.reset();
          this.loadGroups(); // Refresh the table
        },
        error: (error) => {
          console.error('Failed to add group:', error);
        }
      });
    }
  }

  viewDateTrack(): void {
    console.log('View Date Track clicked'); // Implement date track logic
  }

  cancel(): void {
    this.companyGroupForm.reset();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(): void {
    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  get paginatedGroups(): GroupOfCompanyListItem[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.existingGroups.slice(start, start + this.pageSize);
  }

  get secondaryCurrencyOptions(): Currency[] {
    const primaryCurrency = this.companyGroupForm.get('primaryCurrency')?.value;
    return this.currencies.filter(currency => currency.name !== primaryCurrency);
  }
}