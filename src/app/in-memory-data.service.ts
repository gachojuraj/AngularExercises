import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Nice', money: 300, items: [] },
      { id: 12, name: 'Narco', money: 300, items: [] },
      { id: 13, name: 'Bombasto', money: 300, items: [] },
      { id: 14, name: 'Celeritas', money: 300, items: [] },
      { id: 15, name: 'Magneta', money: 300, items: [] },
      { id: 16, name: 'RubberMan', money: 300, items: [] },
      { id: 17, name: 'Dynama', money: 300, items: [] },
      { id: 18, name: 'Dr IQ', money: 300, items: [] },
      { id: 19, name: 'Magma', money: 300, items: [] },
      { id: 20, name: 'Tornado', money: 300, items: [] }
    ];
    return {heroes};
  }
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
  constructor() { }
}
