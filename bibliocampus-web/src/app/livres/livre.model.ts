export interface Livre {
 id: number;
 titre: string;
 auteur: string;
 genre: string;
 dispo: boolean;
 image: string;
}

/** Données envoyées à l'API pour créer ou modifier un livre (sans id). */
export type LivreEntree = Omit<Livre, 'id'>;