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
  MatTabGroup, MatTableDataSource, MatTableModule,
  MatTabsModule
} from '@angular/material';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import { UserStoryComponent } from './project-board/card-view/user-story/user-story.component';
import { TaskComponent } from './project-board/card-view/task/task.component';
import { BugComponent } from './project-board/card-view/bug/bug.component';
import { UserstoryDialogComponent } from './dialog/userstory-dialog/userstory-dialog.component';
import { TaskDialogComponent } from './dialog/task-dialog/task-dialog.component';
import { BugDialogComponent } from './dialog/bug-dialog/bug-dialog.component';
import {UserStoryService} from "./service/userstory-service";
import {TaskService} from "./service/task-service";
import {BugService} from "./service/bug-service";
import { ProjectBacklogComponent } from './project-backlog/project-backlog.component';
import { SprintDialogComponent } from './dialog/sprint-dialog/sprint-dialog.component';
import { SigninComponent } from './signin/signin.component';
import {LOCAL_STORAGE_SERVICE, LocalStorageService} from "./service/localstorage-service";
import {AuthGuard} from "./guard/auth-guard";
import {BasicAuthInterceptor} from "./interceptor/basic-auth-interceptor";
import {LOCAL_STORAGE, StorageServiceModule} from "ngx-webstorage-service";
import {AuthService} from "./service/auth-service";
import { SlimViewComponent } from './project-board/slim-view/slim-view.component';
import { CardViewComponent } from './project-board/card-view/card-view.component';
import { BugsDialogComponent } from './project-board/slim-view/bugs-dialog/bugs-dialog.component';
import { TasksDialogComponent } from './project-board/slim-view/tasks-dialog/tasks-dialog.component';

const appRoutes: Routes = [
  {path: '', component: HomepageComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'organization/:id', component: OrganizationComponent, canActivate: [AuthGuard]},
  {path: 'project/:id', component: ProjectBoardComponent, canActivate: [AuthGuard]},
  {path: 'project/:id/backlog', component: ProjectBacklogComponent, canActivate: [AuthGuard]},
  {path: 'signin', component: SigninComponent},
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
    BugDialogComponent,
    ProjectBacklogComponent,
    SprintDialogComponent,
    SigninComponent,
    SlimViewComponent,
    CardViewComponent,
    BugsDialogComponent,
    TasksDialogComponent
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
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot(),
    ToastContainerModule,
    StorageServiceModule
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
    BugsDialogComponent,
    TasksDialogComponent,
    ProjectDialogComponent,
    ProjectUsersDialogComponent,
    RemoveDialogComponent,
    SprintDialogComponent,
    SigninComponent
  ],
  providers: [
    OrganizationService,
    ProjectService,
    SprintService,
    UserService,
    UserStoryService,
    TaskService,
    BugService,
    ToastrModule,
    AuthGuard,
    AuthService,
    LocalStorageService,
    {provide: LOCAL_STORAGE_SERVICE, useExisting: LOCAL_STORAGE},
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true}
  ],
  exports: [
    MatDividerModule,
    MatIcon,
    MatTabGroup],
  bootstrap: [AppComponent]
})
export class AppModule {
}
