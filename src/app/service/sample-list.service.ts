import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SampleDetails, SampleObj, SampleResult } from '../constance/interface';
import { ApiService } from './api.service';
import { DialogService } from './dialog.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class SampleListService {
  sampleList: SampleResult[] = [];
  sampleListSubject: BehaviorSubject<SampleResult[]> = new BehaviorSubject<
    SampleResult[]
  >([]);
  nextPage: string = '';
  previousPage: string = '';
  sampleObj: SampleObj;

  constructor(
    private apiService: ApiService,
    private loginService: LoginService,
    private dialogService: DialogService
  ) {}

  onGetList() {
    this.apiService
      .get('https://freesound.org/apiv2/search/text/?query=', {
        headers: {
          Authorization: `Bearer ${this.loginService.accessToken}`,
        },
      })
      .then((res: SampleObj) => {
        this.sampleList = res.results;
        console.log(res);
      });
  }

  onGetPage(res: SampleObj) {
    if (res.next != null) {
      this.nextPage = res.next;
    } else {
      this.nextPage = '';
    }
    if (res.previous != null) {
      this.previousPage = res.previous;
    } else {
      this.previousPage = '';
    }
  }

  onGetSearchList(search: string) {
    this.apiService
      .get('https://freesound.org/apiv2/search/text/?query=' + search, {
        headers: {
          Authorization: `Bearer ${this.loginService.accessToken}`,
        },
      })
      .then((res: SampleObj) => {
        this.sampleList = res.results;
        this.onGetPage(res);
        this.sampleObj = res;
      });
  }

  goToNextPage() {
    this.apiService
      .get(this.nextPage, {
        headers: {
          Authorization: `Bearer ${this.loginService.accessToken}`,
        },
      })
      .then((res: SampleObj) => {
        this.sampleList = res.results;
        this.onGetPage(res);
      });
  }

  goToPreviuosPage() {
    this.apiService
      .get(this.previousPage, {
        headers: {
          Authorization: `Bearer ${this.loginService.accessToken}`,
        },
      })
      .then((res: SampleObj) => {
        this.sampleList = res.results;
        this.onGetPage(res);
      });
  }

  downloadSample(id: Number) {
    this.apiService
      .get('https://freesound.org/apiv2/sounds/' + id + '/download/', {
        headers: {
          Authorization: `Bearer ${this.loginService.accessToken}`,
        },
        responseType: 'blob',
      })
      .then((res) => {
        window.location.href =
          'https://freesound.org/apiv2/sounds/' + id + '/download/';
      })
      .catch((err) => {
        alert('errore');
      });
  }

  onManageDetailsRes(res: any) {
    const details: SampleDetails = {
      preview: res.previews['preview-hq-mp3'],
      description: res.description,
      id: res.id,
      images: res.images['waveform_bw_l'],
      name: res.name,
      tags: res.tags,
      username: res.username,
    };
    this.dialogService.openDetailsDialog(details);
  }

  detailSample(id: number) {
    this.apiService
      .get('https://freesound.org/apiv2/sounds/' + id + '/', {
        headers: {
          Authorization: `Bearer ${this.loginService.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        this.onManageDetailsRes(res);
      })
      .catch((err) => {
        alert('errore');
      });
  }
}
