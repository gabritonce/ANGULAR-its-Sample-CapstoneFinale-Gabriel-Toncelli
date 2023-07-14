import { Component, OnInit } from '@angular/core';
import { SampleResult } from 'src/app/constance/interface';
import { SampleFavouriteService } from 'src/app/service/sample-favourite.service';
import { SampleListService } from 'src/app/service/sample-list.service';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.component.html',
  styleUrls: ['./preferiti.component.scss'],
})
export class PreferitiComponent implements OnInit {
  constructor(
    private sampleFavuorite: SampleFavouriteService,
    private sampleListService: SampleListService
  ) {}

  ngOnInit(): void {}
  public get favuoriteList() {
    return this.sampleFavuorite.sampleFavouriteList;
  }
  onDeleteFavuorite(sample: SampleResult) {
    this.sampleFavuorite.onDeleteSample(sample);
  }
  onDeleteAllFavuorite() {
    this.sampleFavuorite.onDeleteFavuoriteList();
  }
  onDetailSampleList(id: number) {
    this.sampleListService.detailSample(id);
  }
}
