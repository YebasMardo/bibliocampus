import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pied-de-page',
  templateUrl: './pied-de-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PiedDePage {
  protected readonly annee = new Date().getFullYear(); // année courante
}
