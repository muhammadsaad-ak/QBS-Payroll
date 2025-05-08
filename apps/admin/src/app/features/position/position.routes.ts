import { Routes } from '@angular/router';
import { GradeComponent } from './grade/grade.component';
import { GradeLevelComponent } from './grade-level/grade-level.component';
import { LocationComponent } from './location/location.component';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { PositionTypeComponent } from './position-type/position-type.component';
import { PositionStatusComponent } from './position-status/position-status.component';
import { EmploymentTypeComponent } from './employment-type/employment-type.component';
import { EmploymentGroupComponent } from './employment-group/employment-group.component';
import { GradeAssignmentComponent } from './grade-assignment/grade-assignment.component';
import { JobComponent } from './job/job.component';
import { FunctionComponent } from './function/function.component';
import { PraRoleComponent } from './pra-role/pra-role.component';
import { PositionComponent } from './position/position.component';

export const POSITION_ROUTES: Routes = [
  {
    path: '', // Remove the 'admin/position' prefix since it's handled by app.routes.ts
    children: [
      { path: '', redirectTo: 'grade', pathMatch: 'full' }, // Default redirect to Grade
      { path: 'grade', component: GradeComponent },
      { path: 'grade-level', component: GradeLevelComponent },
      { path: 'location', component: LocationComponent },
      { path: 'cost-center', component: CostCenterComponent },
      { path: 'position-type', component: PositionTypeComponent },
      { path: 'position-status', component: PositionStatusComponent },
      { path: 'employment-type', component: EmploymentTypeComponent },
      { path: 'employment-group', component: EmploymentGroupComponent },
      { path: 'grade-assignment', component: GradeAssignmentComponent },
      { path: 'job', component: JobComponent },
      { path: 'function', component: FunctionComponent },
      { path: 'pra-role', component: PraRoleComponent },
      { path: 'position', component: PositionComponent }
    ]
  }
];