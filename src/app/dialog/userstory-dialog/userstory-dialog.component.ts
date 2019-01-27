import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-userstory-dialog',
  templateUrl: './userstory-dialog.component.html',
  styleUrls: ['./userstory-dialog.component.css']
})
export class UserstoryDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<UserstoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    console.log('No data was changed');
    this.dialogRef.close();
  }
}
