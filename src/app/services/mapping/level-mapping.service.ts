import { Injectable } from '@angular/core';
import { ILevel } from 'src/app/models/level.model';

@Injectable({
  providedIn: 'root'
})
export class LevelMappingService {

  constructor() { }

  mapLevel(level: ILevel) {
    if(level == null) {
      return level;
    }
    else {
      return {
        key: level.key,
        name: level.name,
        kh_name: level.kh_name
      }
    }
  }
}
