import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseMappingService {

  constructor() { }

  mapSection(section: any) {
    if(section === null) {
      return section;
    } else {
      return {
        courseKey: section.courseKey,
        createdAt: section.createdAt,
        createdBy: section.createdBy,
        isDelete: section.isDelete,
        key: section.key,
        order: section.order,
        sectionObjective: section.sectionObjective,
        sectionTitle: section.sectionTitle,
        status: section.status,
        updatedAt: section.updatedAt,
        updatedBy: section.updatedBy
      };
    }
  }

  mapElement(element: any) {
    if(element === null) {
      return element;
    } else {
      return {
        key: element.key,
        elementDescription: element.elementDescription,
        elementTitle: element.elementTitle,
        no: element.no,
        order: element.order,
        type: element.type,
      }
    }
  }
}
