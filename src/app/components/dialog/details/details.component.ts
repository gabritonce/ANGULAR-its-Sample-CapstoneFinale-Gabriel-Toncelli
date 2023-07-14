import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SampleDetails } from 'src/app/constance/interface';
import { SampleListService } from 'src/app/service/sample-list.service';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SampleDetails,
    private sampleService: SampleListService
  ) {}

  ngOnInit(): void {}
  onDownload() {
    this.sampleService.downloadSample(this.data.id);
  }
  onClose() {
    this.dialogRef.close();
  }
}
