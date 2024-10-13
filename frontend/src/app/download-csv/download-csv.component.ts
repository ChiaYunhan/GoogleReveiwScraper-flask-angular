import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ScrapingService } from '../scraping.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScrapeResult } from '../scrape-result';

@Component({
  selector: 'app-download-csv',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './download-csv.component.html',
  styleUrl: './download-csv.component.css',
})
export class DownloadCsvComponent implements OnInit, OnChanges {
  @Input() scrapeResult!: ScrapeResult;
  fileName: string = '';

  constructor(private scrapingService: ScrapingService) {}

  ngOnInit() {
    this.fileName =
      this.scrapeResult.scraped_at_date +
      '_' +
      this.scrapeResult.scraped_at_time +
      '_' +
      this.scrapeResult.location_name;
  }

  // Implement ngOnChanges to detect changes in the scrapeResult input
  ngOnChanges(changes: SimpleChanges) {
    if (changes['scrapeResult'] && changes['scrapeResult'].currentValue) {
      this.updateFileName();
    }
  }

  // A function to update the fileName based on scrapeResult
  updateFileName() {
    this.fileName =
      this.scrapeResult.scraped_at_date +
      '_' +
      this.scrapeResult.scraped_at_time +
      '_' +
      this.scrapeResult.location_name;
  }

  onDownloadCsv() {
    const newFileName = this.fileName;

    this.scrapingService.downloadCSV(newFileName).subscribe({
      next: (response: Blob) => {
        this.downloadFile(response, newFileName);
      },
      error: (err: any) => {
        console.error('Error downloading CSV:', err);
      },
    });
  }

  downloadFile(data: Blob, fileName: string) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}`;
    a.click();
    window.URL.revokeObjectURL(url); // Clean up
  }
}
