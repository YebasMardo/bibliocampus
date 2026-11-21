import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../core/toast.service';
import { CarteStat } from '../../shared/carte-stat/carte-stat';
import { Carrousel } from './carrousel/carrousel';

@Component({
  selector: 'app-accueil',
  imports: [RouterLink, Carrousel, CarteStat],
  templateUrl: './accueil.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Accueil {
  protected readonly toast = inject(ToastService); // TEMPORAIRE : test des toasts

  protected readonly stats = [
    { valeur: '12 500', libelle: 'Ouvrages disponibles' },
    { valeur: '3 200', libelle: 'Membres inscrits' },
    { valeur: '450', libelle: 'Nouvelles acquisitions' },
    { valeur: '7j/7', libelle: 'Accès en ligne' },
  ];
}
