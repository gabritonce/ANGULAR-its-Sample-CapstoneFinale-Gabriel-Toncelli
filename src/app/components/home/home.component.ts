import { Component, OnInit } from '@angular/core';
import { SampleResult } from 'src/app/constance/interface';
import { CookieStorageService } from 'src/app/service/cookie-storage.service';
import { SampleListService } from 'src/app/service/sample-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  banner: string = '../../assets/img/Ready.png';
  constructor(
    private sampleListService: SampleListService,
    private cookieStorage: CookieStorageService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.sampleListService.onGetList();
    }, 2000);
  }
  public get list(): SampleResult[] {
    return this.sampleListService.sampleList;
  }
  onDetailSampleList(id: number) {
    this.sampleListService.detailSample(id);
  }
  onDownloadSampleList(id: Number) {
    this.sampleListService.downloadSample(id);
  }
}
