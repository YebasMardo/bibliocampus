import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-carte-stat',
  templateUrl: './carte-stat.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarteStat {
  readonly valeur = input.required<string>();
  readonly libelle = input.required<string>();
}
