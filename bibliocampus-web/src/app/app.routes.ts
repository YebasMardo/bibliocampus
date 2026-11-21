import { Routes } from '@angular/router';

import { Accueil } from './pages/accueil/accueil';
import { Catalogue } from './pages/catalogue/catalogue';
import { Actualites } from './pages/actualites/actualites';
import { Inscription } from './pages/inscription/inscription';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: Accueil, title: 'BiblioCampus – Accueil' },
  { path: 'catalogue', component: Catalogue, title: 'BiblioCampus – Catalogue' },
  { path: 'actualites', component: Actualites, title: 'BiblioCampus – Actualités' },
  { path: 'inscription', component: Inscription, title: 'BiblioCampus – Inscription' },
  { path: 'contact', component: Contact, title: 'BiblioCampus – Contact' },
];
