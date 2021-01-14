import { Pipe, PipeTransform } from '@angular/core';
import { pushToObject } from '../services/mapping/user-mapping.service';

@Pipe({
  name: 'getDoc',
})
export class GetDocPipe implements PipeTransform {
  async transform(ref: any, field: string) {
    if (!ref) return;
    const data = pushToObject(await ref.get());
    return data[field];
  }
}
