import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetGreetingWordsService {

  constructor() { }

  getGreetingTime() {
    const  language  ='en';
    var myDate = new Date();
    var hrs = myDate.getHours();
    var greet;
    if (hrs < 12)
      greet = language === 'en' ? "Good Morning" : 'អរុណសួស្តី';
    else if (hrs >= 12 && hrs <= 17)
      greet = language === 'en' ? "Good Afternoon" : 'ទិវាសួស្ដី';
    else if (hrs >= 17 && hrs <= 24)
      greet = language === 'en' ? "Good Evening" : 'សាយ័ន្តសួស្តី';
    return greet;
  }
}
