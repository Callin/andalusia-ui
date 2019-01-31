import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-bug-dialog',
  templateUrl: './bug-dialog.component.html',
  styleUrls: ['./bug-dialog.component.css']
})
export class BugDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<BugDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    console.log('No data was changed');
    this.dialogRef.close();
  }

}
