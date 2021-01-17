import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

interface Entity{
    id: number;
}

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const heroes = [
      { id: 1, name: 'Dr Nice', money: 300, items: [], life: 10, strength: 10 },
      { id: 2, name: 'Narco', money: 300, items: [], life: 10, strength: 10 },
      { id: 3, name: 'Bombasto', money: 300, items: [], life: 10, strength: 10 },
      { id: 4, name: 'Celeritas', money: 300, items: [], life: 10, strength: 10 },
      { id: 5, name: 'Magneta', money: 300, items: [], life: 10, strength: 10 },
      { id: 6, name: 'RubberMan', money: 300, items: [], life: 10, strength: 10 },
      { id: 7, name: 'Dynama', money: 300, items: [], life: 10, strength: 10 },
      { id: 8, name: 'Dr IQ', money: 300, items: [], life: 10, strength: 10 },
      { id: 9, name: 'Magma', money: 300, items: [], life: 10, strength: 10 },
      { id: 0, name: 'Tornado', money: 300, items: [], life: 10, strength: 10 }
    ];

    const items = [
      { id: 1, name: 'Wooden Sword', price: 7 },
      { id: 2, name: 'Fancy Hat', price: 130 },
      { id: 3, name: 'Fast Boots', price: 90 },
      { id: 4, name: 'Magic Book', price: 84 },
      { id: 5, name: 'Heal Potion', price: 50 },
      { id: 6, name: 'Bowling Ball', price: 23 },
      { id: 7, name: 'Soda Can', price: 10 },
      { id: 8, name: 'Paper Plane', price: 3 },
      { id: 9, name: 'Pencil', price: 14 },
      { id: 10, name: 'Water Gun', price: 74 }
    ];
    return {heroes, items};
  }

  genId(list: Entity[]): number {
    return list.length > 0 ? Math.max(...list.map(entity => entity.id)) + 1 : 1;
  }
  
  constructor() { }
}
