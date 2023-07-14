import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Schemes } from '../interfaces/schemes.enum';
import { SchemeService } from '../services/scheme-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected Schemes = Schemes;

  constructor(protected readonly schemeService: SchemeService) {}

  ngOnInit(): void {}
}
