import {Component, Input, OnInit} from '@angular/core';
import {Bug} from "../../dto/bug";
import {UserStory} from "../../dto/user-story";
import {User} from "../../dto/user";
import {AppConstants} from "../../util/app-constants";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material";
import {ToastrService} from "ngx-toastr";
import {BugDialogComponent} from "../../dialog/bug-dialog/bug-dialog.component";
import {BugService} from "../../service/bug-service";
import {RemoveDialogComponent} from "../../dialog/remove-dialog/remove-dialog.component";

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css']
})
export class BugComponent implements OnInit {

  @Input() bug: Bug = Bug.getBlankBug();
  @Input() userStory: UserStory = UserStory.getBlankUserStory();
  @Input() projectUsers: User[] = [];
  public statusList = AppConstants.STATUS_LIST;

  constructor(private bugService: BugService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private toastService: ToastrService) { }

  ngOnInit() {
  }

  onStatusChange() {
    this.bug.userStory = UserStory.getBlankUserStory();
    this.bug.userStory.id = this.userStory.id;
    this.bugService.updateBug(this.bug).subscribe(
      () => this.toastService.info('Bug has been updated ', 'Bug update'),
      () => this.toastService.error('Bug has not been updated ', 'Bug update'))
  }

  getUserName(user: User): string {
    return (user === null || user === undefined) ? "none" : user.name;
  }

  editBug() {
    let boardItemForm: FormGroup = this.formBuilder.group({
      'id': new FormControl(this.bug.id),
      'name': new FormControl(this.bug.name, Validators.required),
      'description': new FormControl(this.bug.description),
      'status': new FormControl(this.bug.status),
      'priority': new FormControl(this.bug.priority),
      'estimation': new FormControl(this.bug.estimation),
      'user': new FormControl(this.bug.user, Validators.required)
    });

    const allUsers = this.projectUsers;
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
          this.bug.name = result.boardItemForm.controls['name'].value;
          this.bug.description = result.boardItemForm.controls['description'].value;
          this.bug.status = result.boardItemForm.controls['status'].value;
          this.bug.priority = result.boardItemForm.controls['priority'].value;
          this.bug.estimation = result.boardItemForm.controls['estimation'].value;

          this.bug.user = User.getBlankUser();
          this.bug.user = result.boardItemForm.controls['user'].value;

          this.bug.userStory= UserStory.getBlankUserStory();
          this.bug.userStory.id = this.userStory.id;

          this.bugService.updateBug(this.bug).subscribe(
            () => {
              this.toastService.info('Bug has been updated ', 'Bug update');
              boardItemForm.controls['user'].setValue(this.bug.user);
            },
            () => this.toastService.error('Bug has not been updated ', 'Bug update'))
        }
      });

  }


  openRemoveBugDialog() {
    const type = 'bug';
    const name = this.bug.name;
    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      width: '30%',
      height: '20%',
      minHeight: 170, // assumes px
      data: {
        name,
        type
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      if (result != null) {
        this.bugService.deleteBug(this.bug.id)
          .subscribe((response) => {
              if (response == null) {
                const indexOfTask = this.userStory.bugs.findIndex(item => item.id === this.bug.id);
                this.userStory.bugs.splice(indexOfTask, 1);
                this.toastService.success(this.bug.name + ' bug was removed', 'Bug removed');
              }
            },
            (error) => {
              this.toastService.error(this.bug.name + ' was not removed', 'Bug removal failed');
              console.log(error);
            });
      }
    });
  }

}
