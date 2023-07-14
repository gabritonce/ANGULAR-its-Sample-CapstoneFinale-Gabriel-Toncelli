import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '../components/dialog/details/details.component';
import { SampleDetails } from '../constance/interface';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  openDetailsDialog(data: SampleDetails) {
    return this.dialog.open(DetailsComponent, {
      autoFocus: false,
      data: data,
    });
  }
}
