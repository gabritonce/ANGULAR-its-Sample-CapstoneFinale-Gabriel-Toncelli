import { Injectable, OnInit } from '@angular/core';
import { sample } from 'rxjs';
import { SampleResult } from '../constance/interface';
import { CookieStorageService } from './cookie-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SampleFavouriteService {
  sampleFavouriteList: SampleResult[] = [];
  constructor(private cookieService: CookieStorageService) {
    if (this.cookieService.checklist()) {
      this.sampleFavouriteList = this.cookieService.getList();
    }
  }

  onAddFavourite(sample: SampleResult) {
    if (this.sampleFavouriteList.length < 9) {
      if (this.sampleFavouriteList.length == 0) {
        this.sampleFavouriteList.unshift(sample);
        this.cookieService.setList(this.sampleFavouriteList);
      } else {
        if (
          this.sampleFavouriteList.findIndex((elem) => elem.id === sample.id) <
          0
        ) {
          this.sampleFavouriteList.unshift(sample);
          this.cookieService.setList(this.sampleFavouriteList);
        } else {
          alert('elemento già presente tra i preferiti');
        }
      }
    } else {
      alert('lista preferita piena');
    }
  }

  onDeleteFavuoriteList() {
    this.sampleFavouriteList = [];
    this.cookieService.deleteList();
  }

  onDeleteSample(sample: SampleResult) {
    const index = this.sampleFavouriteList.findIndex(
      (elem) => elem.id == sample.id
    );
    this.sampleFavouriteList.splice(index, 1);
    this.cookieService.setList(this.sampleFavouriteList);
  }
}
