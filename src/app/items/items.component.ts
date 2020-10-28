import { Component, OnInit } from '@angular/core';
import { Item } from '../item'
import { MessageService } from '../message.service';
import { ItemService } from '../item.service';
import { HeroService } from '../hero.service';
import { Hero } from '../hero'
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[];
  freeItems: Item[];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private itemService: ItemService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getCurrentHero(): Observable<Hero>{
    let hero: Hero;
    this.route.params.subscribe(params => {
      let id = params['hid'];
      if (id === "list"){
        this.getItems();
        return of(undefined);
      } 
      else this.heroService.getHero(id).subscribe(result => hero = result);
    });
    return of(hero);
  }

  getItems(): void {
    this.itemService.getItems()
        .subscribe(items =>{ this.items = items; this.freeItems = items});
  }

  hero: Hero;
  canBuy(item: Item): boolean {
    const id = +this.route.snapshot.paramMap.get('hid');
    if (Number.isNaN(id)) return false;
    if (this.hero === undefined) this.heroService.getHero(id)
      .subscribe(result => this.hero = result);
    return this.hero.money > item.price;
  }

  buyItem(item: Item): void{
    this.hero.money -= item.price;
    this.hero.items.push(item);
    const index = this.freeItems.indexOf(item);
    if (index > -1) {
       this.freeItems.splice(index, 1);
    }
  }
}