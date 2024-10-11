import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrapeFormComponent } from './scrape-form/scrape-form.component';
import { DownloadCsvComponent } from './download-csv/download-csv.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ScrapeFormComponent,
    DownloadCsvComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'google map scraper';
  scrapeResult: any = null;

  onScrapeCompleted(result: any) {
    this.scrapeResult = result;
  }

  resetScrapeResult() {
    this.scrapeResult = null;
  }
}
