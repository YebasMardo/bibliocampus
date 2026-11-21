import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

const CLE_THEME = 'bibliocampus-theme';

@Component({
  selector: 'app-entete',
  imports: [RouterLink, RouterLinkActive], // (1) dépendances du template
  templateUrl: './entete.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Entete {
  protected readonly menuOuvert = signal(false); // (2) état local réactif
  protected readonly sombre = signal(this.themeInitial());

  protected readonly liens = [
    // (3) données du menu
    { chemin: '/', libelle: 'Accueil' },
    { chemin: '/catalogue', libelle: 'Catalogue' },
    { chemin: '/actualites', libelle: 'Actualités' },
    { chemin: '/inscription', libelle: 'Inscription' },
    { chemin: '/contact', libelle: 'Contact' },
    { chemin: '/mon-espace', libelle: 'Mon espace' },
  ];

  constructor() {
    // Applique la classe "dark" sur <html> et mémorise le choix
    effect(() => {
      const sombre = this.sombre();
      document.documentElement.classList.toggle('dark', sombre);
      try {
        localStorage.setItem(CLE_THEME, sombre ? 'dark' : 'light');
      } catch {
        // stockage indisponible : le thème reste valable pour la session
      }
    });
  }

  protected basculerMenu(): void {
    this.menuOuvert.update((ouvert) => !ouvert); // (4) mise à jour fonctionnelle
  }

  protected basculerTheme(): void {
    this.sombre.update((s) => !s);
  }

  private themeInitial(): boolean {
    try {
      const memorise = localStorage.getItem(CLE_THEME);
      if (memorise) return memorise === 'dark';
    } catch {
      // ignore
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
