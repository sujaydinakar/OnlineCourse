import { Injectable } from '@angular/core';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DataManipulationService {

  constructor() { }

  static orderBy(rows: Array<any>, field: string) {
    return _.orderBy(rows, [field])
  }

  static orderByDesc(rows: Array<any>, field: string) {
    return _.orderBy(rows, [field], "desc")
  }

  static groupBy(data: Array<any>, field: string, orderBy: string) {
    const rows = _.uniqBy(data, field)
    return _.orderBy(rows, [orderBy])
  }

  static groupByOrderDesc(data: Array<any>, field: string, orderBy: string) {
    const rows = _.uniqBy(data, field)
    return _.orderBy(rows, [orderBy], ['desc'])
  }
}
