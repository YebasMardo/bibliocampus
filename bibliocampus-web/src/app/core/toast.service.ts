import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  texte: string;
  type: 'succes' | 'erreur';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private compteur = 0;

  readonly toasts = signal<Toast[]>([]); // liste réactive des messages affichés

  succes(texte: string): void {
    this.ajouter(texte, 'succes');
  }

  erreur(texte: string): void {
    this.ajouter(texte, 'erreur');
  }

  fermer(id: number): void {
    this.toasts.update((liste) => liste.filter((t) => t.id !== id));
  }
  
  private ajouter(texte: string, type: Toast['type']): void {
    const id = ++this.compteur;
    this.toasts.update((liste) => [...liste, { id, texte, type }]); // nouvelle liste : jamais de push
    setTimeout(() => this.fermer(id), 4000); // disparaît après 4 s
  }
}
