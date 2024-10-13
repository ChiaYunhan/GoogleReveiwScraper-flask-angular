import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScrapeResult } from './scrape-result';

// this is scraping service
@Injectable({
  providedIn: 'root',
})
export class ScrapingService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  // Function to send the Google Map URL to Flask
  scrapeGoogleMap(url: string): Observable<ScrapeResult> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { googleMapUrl: url }; // Prepare data to send

    return this.http.post<any>(`${this.apiUrl}/scrape`, body, {
      headers,
      withCredentials: true,
    });
  }

  // Function to download the scraped data as CSV from Flask
  downloadCSV(fileName: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download`, {
      params: { csv_name: fileName }, // Pass the filename to Flask
      responseType: 'blob', // Expect the response to be a Blob (binary data)
      withCredentials: true,
    });
  }
}
