import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class ServiceBase {
  private _http: HttpClient;
  protected apiUrl: string;
  public headers: HttpHeaders;

  constructor(http: HttpClient) {
    this._http = http;
    this.apiUrl = 'https://pantry-to-table.azurewebsites.net/'
    // this.apiUrl = 'http://localhost:5000'
    this.headers = new HttpHeaders(
      { 'Access-Control-Allow-Origin': ['https://pantry-to-table.azurewebsites.net/'] }
    );
    this.headers = this.headers.set('Access-Control-Allow-Origin', 'https://pantry-to-table.azurewebsites.net/');
    this.headers = this.headers.set('Access-Control-Allow-Credentials', 'true');
    this.headers.get('');
  }

  public getWithParams<T>(url: string, body: T): Observable<any> {
    return this._http.post(this.apiUrl + url, body, {
      headers: this.headers,
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  public get<T>(url: string): Observable<any> {
    return this._http.get(this.apiUrl + url
      ,{
      headers: this.headers,
      withCredentials: true
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

  public handleError(error: HttpErrorResponse) {
    if (error.status == 401) {

    }

    // Throw error and set up error handler to catch and display
    return throwError(error);
  }
}
