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

const appRoutes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'admin', component: AdminComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    OrganizationTabComponent,
    AdminComponent,
    OrganizationDialogComponent
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
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents: [
  AdminComponent,
  OrganizationDialogComponent,
  OrganizationTabComponent],
  providers: [
    OrganizationService,
  ],
  exports: [
    MatDividerModule,
    MatIcon,
    MatTabGroup],
  bootstrap: [AppComponent]
})
export class AppModule {
}
