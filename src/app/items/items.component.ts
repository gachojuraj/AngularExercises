import { Component, OnInit } from '@angular/core';
import { Item } from '../item'
import { MessageService } from '../message.service';
import { ItemService } from '../item.service';
import { HeroService } from '../hero.service';
import { Hero } from '../hero'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ItemFormComponent } from '../item-form/item-form.component';
import { AuthService } from '../auth.service';

enum SortBy { ID = "Id", NAME = "Name", PRICE = "Price" };
class dropDownMenu{
  selected: any;
  descending: boolean = false;
  show: boolean = false;
  options: any;
  constructor(options : any){
    this.options = Object.values(options);
    this.selected = this.options[0];
  }
}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[];
  hero: Hero;
  dropdown: dropDownMenu = new dropDownMenu(SortBy);

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private itemService: ItemService,
    private router: Router,
    private messageService: MessageService,
    public dialog: MatDialog,
     public authService: AuthService) { }

  ngOnInit(): void {
    this.getItems();
  }

  sortBy(sortBy : SortBy, descending : boolean){
    switch (sortBy){
      case SortBy.ID:
        this.items.sort((a, b) => a.id - b.id);
        break;
      case SortBy.PRICE:
        this.items.sort((a, b) => a.price - b.price);
        break;
      case SortBy.NAME:
        this.items.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    if (descending) this.items.reverse();
  }

  getItems(): void {
    this.itemService.getItems()
        .subscribe(items =>{ 
          this.items = items;
          if (this.isHero()) this.items = this.items.filter((el: Item) => { return !el.isOwned });
        });
  }

  isHero(): boolean{
    const id = +this.route.snapshot.paramMap.get('hid');
    if (Number.isNaN(id)) return false;
    if (this.hero === undefined) this.heroService.getHero(id)
      .subscribe(result => this.hero = result)
    return true;
  }

  
  canBuy(item: Item): boolean {
    if (this.isHero()) return this.hero.money > item.price;
    return false;
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.itemService.addItem({ name } as Item)
      .subscribe(item => {
        this.items.push(item);
      });
  }

  delete(item: Item): void {
    this.items = this.items.filter(e => e !== item);
    this.itemService.deleteItem(item).subscribe();
  }

  buyItem(item: Item): void{
    this.hero.money -= item.price;
    this.hero.items.push(item);
    item.isOwned = true;
    const index = this.items.indexOf(item);
    if (index > -1) this.items.splice(index, 1);
    this.heroService.updateHero(this.hero).subscribe();
    this.itemService.updateItem(item).subscribe();
  }

  showItemForm(){
    const dialogRef = this.dialog.open(ItemFormComponent, {
      width: '250px', data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined)
      this.itemService.addItem({name: result.name, price: result.price} as Item)
      .subscribe(item => {
        this.items.push(item);
      });
    });
  }
}
