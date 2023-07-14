import { Component, OnInit } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { SampleListService } from 'src/app/service/sample-list.service';
import { CookieStorageService } from 'src/app/service/cookie-storage.service';
import { SampleObj, SampleResult } from 'src/app/constance/interface';
import { SampleFavouriteService } from 'src/app/service/sample-favourite.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
})
export class CatalogoComponent implements OnInit {
  sampleForm: UntypedFormGroup;

  constructor(
    private sampleListService: SampleListService,
    private sampleFavuorite: SampleFavouriteService
  ) {
    this.sampleForm = new UntypedFormGroup({
      search: new UntypedFormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}
  public get list(): SampleResult[] {
    return this.sampleListService.sampleList;
  }
  onSampleSearchList() {
    const search = this.sampleForm.get('search').value;
    this.sampleListService.onGetSearchList(search);
  }

  onDownloadSampleList(id: Number) {
    this.sampleListService.downloadSample(id);
  }

  onDetailSampleList(id: number) {
    this.sampleListService.detailSample(id);
  }

  searchWithCard(cardValue: string) {
    this.sampleListService.onGetSearchList(cardValue);
  }

  addFavuorite(sample: SampleResult) {
    this.sampleFavuorite.onAddFavourite(sample);
  }

  goNext() {
    this.sampleListService.goToNextPage();
  }

  goBack() {
    this.sampleListService.goToPreviuosPage();
  }
  public get listObj(): SampleObj {
    return this.sampleListService.sampleObj;
  }
}
