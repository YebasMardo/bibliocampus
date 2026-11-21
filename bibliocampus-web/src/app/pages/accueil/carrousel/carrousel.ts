import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
interface Diapo {
  image: string;
  titre: string;
  texte: string;
}
@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Carrousel {
  protected readonly diapos: Diapo[] = [
    {
      image: '/images/slide1.jpg',
      titre: 'Bienvenue à BiblioCampus',
      texte: 'Votre bibliothèque universitaire en ligne',
    },
    {
      image: '/images/slide2.jpg',
      titre: 'Plus de 12 500 ouvrages',
      texte: 'Romans, sciences, ingénierie…',
    },
    { image: '/images/slide3.jpg', titre: 'Ouvert 7j/7', texte: 'Réservez depuis chez vous' },
  ];
  protected readonly index = signal(0); // (1)
  protected readonly courante = computed(() => this.diapos[this.index()]); // (2)
  constructor() {
    const minuteur = setInterval(() => this.suivante(), 5000); // (3)
    inject(DestroyRef).onDestroy(() => clearInterval(minuteur)); // (4)
  }
  protected suivante(): void {
    this.index.update((i) => (i + 1) % this.diapos.length);
  }
  protected precedente(): void {
    this.index.update((i) => (i - 1 + this.diapos.length) % this.diapos.length);
  }
  protected aller(i: number): void {
    this.index.set(i);
  }
}
