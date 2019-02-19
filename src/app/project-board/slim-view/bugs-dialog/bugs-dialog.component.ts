import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../../dto/user";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatTableDataSource} from "@angular/material";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppConstants} from "../../../util/app-constants";
import {UserStory} from "../../../dto/user-story";
import {BugService} from "../../../service/bug-service";
import {Bug} from "../../../dto/bug";
import {BugDialogComponent} from "../../../dialog/bug-dialog/bug-dialog.component";

@Component({
  selector: 'app-bugs-dialog',
  templateUrl: './bugs-dialog.component.html',
  styleUrls: ['./bugs-dialog.component.css']
})
export class BugsDialogComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'priority', 'estimation', 'user'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(private dialogRef: MatDialogRef<BugsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private bugService: BugService,
              private toastService: ToastrService,
              public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data.datasource);
  }

  openItemDialog(item: Bug) {
    let boardItemForm: FormGroup = this.formBuilder.group({
      'id': new FormControl(item.id),
      'name': new FormControl(item.name, Validators.required),
      'description': new FormControl(item.description),
      'status': new FormControl(item.status),
      'priority': new FormControl(item.priority),
      'estimation': new FormControl(item.estimation),
      'user': new FormControl(item.user, Validators.required)
    });

    const allUsers = this.data.projectUsers;
    const statusList: string[] = AppConstants.STATUS_LIST;

    let matDialogConfig = {
      data: {
        boardItemForm,
        allUsers,
        statusList
      }
    };

    const dialogRef = this.dialog.open(BugDialogComponent, matDialogConfig);

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result != null) {
          item.name = result.boardItemForm.controls['name'].value;
          item.description = result.boardItemForm.controls['description'].value;
          item.status = result.boardItemForm.controls['status'].value;
          item.priority = result.boardItemForm.controls['priority'].value;
          item.estimation = result.boardItemForm.controls['estimation'].value;

          item.user = User.getBlankUser();
          item.user = result.boardItemForm.controls['user'].value;

          item.userStory = UserStory.getBlankUserStory();
          item.userStory.id = this.data.userStoryId;

          this.bugService.updateBug(item).subscribe(
            () => {
              this.toastService.success('Bug has been updated ', 'Bug update');
              boardItemForm.controls['user'].setValue(item.user);
            },
            () => this.toastService.error('Bug has not been updated ', 'Bug update'))
        }
      });

  }

  onNoClick(): void {
    console.log('No data was changed');
    this.dialogRef.close();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getUserName(user: User): string {
    return (user === null || user === undefined) ? "none" : user.name;
  }
}
