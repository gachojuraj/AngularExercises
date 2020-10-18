import { Component, OnInit } from '@angular/core';
import { Item } from '../item'
import { ITEMS } from '../mock-items';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items = ITEMS;

  constructor() { }

  ngOnInit(): void {
  }
  
  selectedItem: Item;
  onSelect(item: Item): void {
    if (this.selectedItem == item) this.selectedItem = null;
    else this.selectedItem = item;
  }
}
