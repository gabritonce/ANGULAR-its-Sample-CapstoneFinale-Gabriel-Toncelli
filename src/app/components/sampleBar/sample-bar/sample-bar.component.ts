import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sample-bar',
  templateUrl: './sample-bar.component.html',
  styleUrls: ['./sample-bar.component.scss'],
})
export class SampleBarComponent implements OnInit {
  @Output() cardSearch = new EventEmitter<string>();
  @Input() prova = '';
  constructor() {}

  ngOnInit(): void {}

  onClickCard(cardValue: string) {
    this.cardSearch.emit(cardValue);
    console.log(cardValue);
  }
}
