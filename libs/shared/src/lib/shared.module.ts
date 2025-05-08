import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { SharedComponent } from './components/shared/shared.component';

@NgModule({
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      enableHtml: true,
      timeOut: 5000,
      closeButton: true,
    }),
  ],
  exports: [
    CommonModule,
    ToastrModule,
  ],
})
export class SharedModule {}