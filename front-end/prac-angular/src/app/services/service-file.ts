import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
public addNote(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${environment.endpoints.addNote}`, payload);
  }

  public updateNote(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${environment.endpoints.updateNote}`, payload);
  }

  public deleteNote(note_id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}${environment.endpoints.deleteNote}`, { note_id });
  }

  public onSignUp(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${environment.endpoints.signup}`, payload);
  }

  public onSignIn(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${environment.endpoints.signin}`, payload);
  }

  public getAllNotes(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${environment.endpoints.getAllNotes}`, payload);
  }

  public changeNoteStatus(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${environment.endpoints.changeNoteStatus}`, payload);
  }
}

