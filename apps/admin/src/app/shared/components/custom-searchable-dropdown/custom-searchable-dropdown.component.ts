import { Component, Input, Output, EventEmitter, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownOption } from '../../../core/models/dropdown-option.model';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside/click-outside.component';

@Component({
  selector: 'app-custom-searchable-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule, ClickOutsideDirective],
  templateUrl: './custom-searchable-dropdown.component.html',
  styleUrls: ['./custom-searchable-dropdown.component.scss']
})
export class CustomSearchableDropdownComponent implements OnInit {
  @Input() options: DropdownOption[] = [];
  @Input() placeholder = 'Select';
  @Input() selectedValue: string = '';
  @Output() valueChanged = new EventEmitter<string>();

  searchTerm = '';
  isOpen = false;

  @ViewChild('dropdownTrigger') dropdownTrigger!: ElementRef;

  filteredOptions: DropdownOption[] = [];

  ngOnInit() {
    this.filteredOptions = [...this.options];
  }

  onSearch() {
    this.filteredOptions = this.options.filter(option =>
      option.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.searchTerm = this.selectedValue || '';
      this.onSearch();
    }
  }

  selectOption(value: string) {
    this.selectedValue = value;
    this.valueChanged.emit(value);
    this.isOpen = false;
    this.searchTerm = value;
  }

  onClickOutside(event: MouseEvent) {
    if (!this.dropdownTrigger.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}