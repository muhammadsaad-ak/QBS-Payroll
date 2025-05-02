import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, OnDestroy {
  locationForm: FormGroup;
  locations: any[] = [];
  isFormCollapsed = false;

  // Pagination properties
  currentPage = 1;
  rowsPerPage = 10;
  totalPages = 1;
  paginatedLocations: any[] = [];

  constructor(private fb: FormBuilder) {
    this.locationForm = this.fb.group({
      companyName: ['', Validators.required],
      locationId: [{ value: '(system-generated)', disabled: true }],
      locationName: ['', Validators.required],
      locationType: [''],
      shortCode: [''],
      emailAddress: ['', [Validators.email]],
      contactNumber: [''],
      alternateContactNumber: [''],
      timeZone: [''],
      addressLine1: [''],
      addressLine2: [''],
      postalCode: [''],
      city: [''],
      state: [''],
      country: [''],
      effectiveDate: ['', Validators.required],
      active: [true]
    });
  }

  ngOnInit() {
    // Reset state on component initialization
    this.isFormCollapsed = false;
    this.locations = []; // Initially empty, table will not appear
    this.currentPage = 1;
    this.paginatedLocations = [];
    this.totalPages = 1;
    this.resetForm();
    this.updatePagination();
  }

  ngOnDestroy() {
    // Ensure animations can complete by resetting state
    this.isFormCollapsed = false;
  }

  toggleFormCollapse() {
    this.isFormCollapsed = !this.isFormCollapsed;
  }

  toggleActive() {
    const activeControl = this.locationForm.get('active');
    if (activeControl) {
      activeControl.setValue(!activeControl.value, { emitEvent: false });
    }
  }

  onSubmit() {
    console.log('Form Valid:', this.locationForm.valid);
    console.log('Form Values:', this.locationForm.getRawValue());
    console.log('Form Errors:', this.locationForm.errors);

    if (this.locationForm.valid) {
      const formValue = { ...this.locationForm.getRawValue() };
      // Simulate system-generated location ID
      formValue.locationId = `LOC-${(this.locations.length + 1).toString().padStart(3, '0')}`;
      this.locations.push(formValue);
      console.log('Locations after push:', this.locations);
      this.updatePagination();
      this.resetForm();
    } else {
      console.log('Form is invalid. Required fields missing or invalid.');
      Object.keys(this.locationForm.controls).forEach(key => {
        const control = this.locationForm.get(key);
        if (control?.invalid) {
          console.log(`Field ${key} is invalid:`, control.errors);
        }
      });
    }
  }

  resetForm() {
    this.locationForm.reset({
      companyName: '',
      locationId: '(system-generated)',
      locationName: '',
      locationType: '',
      shortCode: '',
      emailAddress: '',
      contactNumber: '',
      alternateContactNumber: '',
      timeZone: '',
      addressLine1: '',
      addressLine2: '',
      postalCode: '',
      city: '',
      state: '',
      country: '',
      effectiveDate: '',
      active: true
    });
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.locations.length / this.rowsPerPage);
    this.currentPage = Math.min(this.currentPage, this.totalPages);
    this.currentPage = Math.max(this.currentPage, 1);
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedLocations = this.locations.slice(start, end);
    console.log('Paginated Locations:', this.paginatedLocations);
  }

  changePage(delta: number) {
    this.currentPage += delta;
    this.updatePagination();
  }
}