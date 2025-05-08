import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LocationDataService } from '../../../core/services/location-data.service';
import { LocationService } from '../../../core/services/location.service';
import { Location } from '../../../core/models/location.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, HttpClientModule],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, OnDestroy {
  locationForm: FormGroup;
  locations: Location[] = [];
  isFormCollapsed = false;

  // Dropdown data
  countries: string[] = [];
  states: string[] = [];
  cities: string[] = [];
  timeZones: string[] = [];

  // Search terms
  countrySearchTerm = '';
  stateSearchTerm = '';
  citySearchTerm = '';

  // Pagination properties
  currentPage = 1;
  rowsPerPage = 10;
  totalPages = 1;
  totalItems = 0;
  paginatedLocations: Location[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private locationDataService: LocationDataService,
    private locationService: LocationService
  ) {
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
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      effectiveDate: ['', Validators.required],
      active: [true]
    });
  }

  ngOnInit() {
    this.isFormCollapsed = false;
    this.loadCountries();
    this.loadTimeZones();
    this.loadLocations();
  }

  ngOnDestroy() {
    this.isFormCollapsed = false;
    this.subscriptions.unsubscribe();
  }

  loadCountries() {
    this.subscriptions.add(
      this.locationDataService.getCountries().subscribe(data => {
        this.countries = data;
      })
    );
  }

  loadStates() {
    const country = this.locationForm.get('country')?.value;
    if (country) {
      this.subscriptions.add(
        this.locationDataService.getStates(country).subscribe(data => {
          this.states = data;
          this.locationForm.get('state')?.setValue('');
          this.loadCities();
        })
      );
    }
  }

  loadCities() {
    const country = this.locationForm.get('country')?.value;
    const state = this.locationForm.get('state')?.value;
    if (country && state) {
      this.subscriptions.add(
        this.locationDataService.getCities(country, state).subscribe(data => {
          this.cities = data;
          this.locationForm.get('city')?.setValue('');
        })
      );
    }
  }

  loadTimeZones() {
    this.subscriptions.add(
      this.locationDataService.getTimeZones().subscribe(data => {
        this.timeZones = data;
      })
    );
  }

  loadLocations() {
    const skip = (this.currentPage - 1) * this.rowsPerPage;
    const count = this.rowsPerPage;
    this.subscriptions.add(
      this.locationService.listLocations(skip, count).subscribe({
        next: (response) => {
          this.locations = response.data.items || [];
          this.totalItems = response.data.totalCount || 0;
          this.updatePagination();
        },
        error: (err) => {
          console.error('Error loading locations:', err);
          this.locations = [];
          this.totalItems = 0;
          this.updatePagination();
        }
      })
    );
  }

  onCountrySearch(event: Event) {
    const term = (event.target as HTMLInputElement).value.toLowerCase();
    this.countrySearchTerm = term;
  }

  onStateSearch(event: Event) {
    const term = (event.target as HTMLInputElement).value.toLowerCase();
    this.stateSearchTerm = term;
  }

  onCitySearch(event: Event) {
    const term = (event.target as HTMLInputElement).value.toLowerCase();
    this.citySearchTerm = term;
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
    if (this.locationForm.valid) {
      const formValue = this.locationForm.getRawValue();
      const payload: Location = {
        companyID: formValue.companyName, // Adjust based on how companyID is determined
        companyName: formValue.companyName,
        locationName: formValue.locationName,
        locationType: formValue.locationType,
        shortCode: formValue.shortCode,
        emailAddress: formValue.emailAddress,
        contactNumber: formValue.contactNumber,
        alternateContactNumber: formValue.alternateContactNumber,
        address1: formValue.addressLine1,
        address2: formValue.addressLine2,
        postalCode: formValue.postalCode,
        city: formValue.city,
        state: formValue.state,
        country: formValue.country,
        timeZone: formValue.timeZone
      };

      this.subscriptions.add(
        this.locationService.addLocation(payload).subscribe({
          next: (addedLocation) => {
            this.locations.push(addedLocation);
            this.totalItems++;
            this.updatePagination();
            this.resetForm();
          },
          error: (err) => {
            console.error('Error adding location:', err);
          }
        })
      );
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
    this.states = [];
    this.cities = [];
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.totalItems / this.rowsPerPage);
    this.currentPage = Math.min(this.currentPage, this.totalPages);
    this.currentPage = Math.max(this.currentPage, 1);
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedLocations = this.locations.slice(start, end);
  }

  changePage(delta: number) {
    this.currentPage += delta;
    this.loadLocations();
  }

  getFilteredCountries() {
    return this.countries.filter(country =>
      country.toLowerCase().includes(this.countrySearchTerm)
    );
  }

  getFilteredStates() {
    return this.states.filter(state =>
      state.toLowerCase().includes(this.stateSearchTerm)
    );
  }

  getFilteredCities() {
    return this.cities.filter(city =>
      city.toLowerCase().includes(this.citySearchTerm)
    );
  }
}