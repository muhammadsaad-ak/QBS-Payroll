import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  constructor(private translationService: TranslationService) { }

  transform(key: string): Observable<string> | string {
    return this.translationService.translate(key);
  }
}
