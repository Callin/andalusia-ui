import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {HomepageComponent} from './homepage/homepage.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OrganizationTabComponent} from './admin/organization-tab/organization-tab.component';
import {AdminComponent} from './admin/admin.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIcon,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSelectModule,
  MatTabGroup,
  MatTabsModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {OrganizationDialogComponent} from './dialog/organization-dialog/organization-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrganizationService} from './service/organization-service';
import {RemoveDialogComponent} from './dialog/remove-dialog/remove-dialog.component';
import {ToastContainerModule, ToastrModule} from "ngx-toastr";
import { UserTabComponent } from './admin/user-tab/user-tab.component';
import { UserDialogComponent } from './dialog/user-dialog/user-dialog.component';
import {UserService} from "./service/user-service";
import { OrganizationComponent } from './organization/organization.component';
import { ProjectsTabComponent } from './organization/projects-tab/projects-tab.component';
import { UsersTabComponent } from './organization/users-tab/users-tab.component';
import {ProjectService} from "./service/project-service";
import {SprintService} from "./service/sprint-service";
import { ProjectDialogComponent } from './dialog/project-dialog/project-dialog.component';
import { ProjectUsersDialogComponent } from './dialog/project-users-dialog/project-users-dialog.component';
import { ProjectBoardComponent } from './project-board/project-board.component';
import { UserStoryComponent } from './project-board/user-story/user-story.component';
import { TaskComponent } from './project-board/task/task.component';
import { BugComponent } from './project-board/bug/bug.component';
import { UserstoryDialogComponent } from './dialog/userstory-dialog/userstory-dialog.component';
import { TaskDialogComponent } from './dialog/task-dialog/task-dialog.component';
import { BugDialogComponent } from './dialog/bug-dialog/bug-dialog.component';
import {UserStoryService} from "./service/userstory-service";

const appRoutes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'organization/:id', component: OrganizationComponent},
  {path: 'project/:id', component: ProjectBoardComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    OrganizationTabComponent,
    AdminComponent,
    OrganizationDialogComponent,
    RemoveDialogComponent,
    UserTabComponent,
    UserDialogComponent,
    OrganizationComponent,
    ProjectsTabComponent,
    UsersTabComponent,
    ProjectDialogComponent,
    ProjectUsersDialogComponent,
    ProjectBoardComponent,
    UserStoryComponent,
    TaskComponent,
    BugComponent,
    UserstoryDialogComponent,
    TaskDialogComponent,
    BugDialogComponent
  ],
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatCardModule,
    MatSelectModule,
    MatListModule,
    MatMenuModule,
    MatGridListModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot(),
    ToastContainerModule
  ],
  entryComponents: [
    AdminComponent,
    OrganizationComponent,
    OrganizationDialogComponent,
    OrganizationTabComponent,
    UserTabComponent,
    UserDialogComponent,
    UserstoryDialogComponent,
    TaskDialogComponent,
    BugDialogComponent,
    ProjectDialogComponent,
    ProjectUsersDialogComponent,
    RemoveDialogComponent
  ],
  providers: [
    OrganizationService,
    ProjectService,
    SprintService,
    UserService,
    UserStoryService,
    ToastrModule
  ],
  exports: [
    MatDividerModule,
    MatIcon,
    MatTabGroup],
  bootstrap: [AppComponent]
})
export class AppModule {
}
