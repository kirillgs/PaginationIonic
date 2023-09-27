import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var eoapi: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private length = 100;
  private width = 3;
  private maxSentence = 50;

  public table: number[] = new Array<number>(this.length);
  public columns: number[] = new Array<number>(this.width);
  public text: string[] = new Array<string>(this.length);

  constructor(private readonly httpClient: HttpClient) {
  }

  ngOnInit(): void {
    // set styling to enable PDF rendering of Ionic app
    const ionPageBody: HTMLBodyElement = document.getElementsByTagName('body')[0];
    ionPageBody.classList.add("pdf-generation");

    // generate table with random words
    this.httpClient.get<string[]>(`https://random-word-api.herokuapp.com/word?number=${this.length}`).subscribe(words => {
      for (let index = 0; index < this.length; ++index) {
        this.text[index] = this.getNext(words, index).reduce((acc, cur) => acc + ' ' + cur, '');
      }

      if(typeof (eoapi) === 'object') {
        setTimeout(() => eoapi.convert(), 0);
      }
    });
  }

  private getNext(words: string[], start: number): string[] {
    const count = Math.floor(Math.random() * this.maxSentence) + 1;
    return words.slice(start, Math.min(start + count, this.length - 1));
  }
}
