import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pra-role',
  templateUrl: './pra-role.component.html',
  styleUrls: ['./pra-role.component.scss'],
  standalone: true,
  imports: [
    CommonModule, // For *ngIf, *ngFor, [ngClass]
    ReactiveFormsModule, // For [formGroup]
    FormsModule, // For [(ngModel)]
    RouterModule // For routerLink
  ]
})
export class PraRoleComponent implements OnInit {
  praRoleForm: FormGroup;
  isFormCollapsed = false;
  praRoles: any[] = [];
  paginatedPraRoles: any[] = [];
  currentPage = 1;
  rowsPerPage = 10;
  totalPages = 1;
  praRoleIdCounter = 1; // For generating unique PRA role entries

  constructor(private fb: FormBuilder) {
    this.praRoleForm = this.fb.group({
      company: ['QBS 01', Validators.required],
      praRoleName: ['', Validators.required],
      effectiveDate: ['', Validators.required],
      active: [true] // Default to true
    });
  }

  ngOnInit() {
    // Initialize with an empty praRoles array
    this.praRoles = [];
    this.updatePagination();
  }

  onSubmit() {
    if (this.praRoleForm.valid) {
      const newPraRole = this.praRoleForm.getRawValue();
      // Generate a unique identifier or use the form data as needed
      newPraRole.id = `PRA-${this.praRoleIdCounter++}`;
      this.praRoles.push(newPraRole);
      this.updatePagination();
      this.praRoleForm.reset();
      this.praRoleForm.patchValue({ company: 'QBS 01', active: true });
    }
  }

  toggleFormCollapse() {
    this.isFormCollapsed = !this.isFormCollapsed;
  }

  toggleActive() {
    const activeControl = this.praRoleForm.get('active');
    activeControl?.setValue(!activeControl.value);
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedPraRoles = this.praRoles.slice(start, end);
    this.totalPages = Math.ceil(this.praRoles.length / this.rowsPerPage);
  }

  changePage(direction: number) {
    this.currentPage += direction;
    this.updatePagination();
  }
}