import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../core/api';
import { Livre, LivreEntree } from './livre.model';

@Injectable({ providedIn: 'root' }) // (1) un seul exemplaire pour toute l'appli
export class LivresService {
  private readonly http = inject(HttpClient); // (2) injection moderne

  private readonly url = `${API_URL}/livres`;

  lister(genre?: string, q?: string): Observable<Livre[]> {
    let params = new HttpParams(); // (3) construit ?genre=...&q=...
    if (genre) params = params.set('genre', genre);
    if (q) params = params.set('q', q);
    return this.http.get<Livre[]>(this.url, { params });
  }

  obtenir(id: number): Observable<Livre> {
    return this.http.get<Livre>(`${this.url}/${id}`);
    
  }

  creer(livre: LivreEntree): Observable<Livre> {
    return this.http.post<Livre>(this.url, livre);
  }

  modifier(id: number, livre: LivreEntree): Observable<Livre> {
    return this.http.put<Livre>(`${this.url}/${id}`, livre);
  }

  supprimer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
