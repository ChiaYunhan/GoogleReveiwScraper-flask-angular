import { Component, Input, OnInit } from '@angular/core';
import { ScrapingService } from '../scraping.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-download-csv',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './download-csv.component.html',
  styleUrl: './download-csv.component.css',
})
export class DownloadCsvComponent implements OnInit {
  @Input() scrapeResult: any;
  fileName: string = '';

  constructor(private scrapingService: ScrapingService) {}

  ngOnInit() {
    this.fileName = this.scrapeResult.default_file_name;
  }

  onDownloadCsv() {
    const file_name = this.fileName || this.scrapeResult.default_file_name;

    this.scrapingService.downloadCSV(file_name).subscribe({
      next: (response: Blob) => {
        this.downloadFile(response, file_name);
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
