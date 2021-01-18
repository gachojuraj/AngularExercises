import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { MatDialog } from '@angular/material/dialog'
import { HeroFormComponent } from '../hero-form/hero-form.component'

enum SortBy { ID = "Id", NAME = "Name", MONEY = "Money" };
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
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  dropdown: dropDownMenu = new dropDownMenu(SortBy);
  heroes: Hero[];

  constructor(private heroService: HeroService, private messageService: MessageService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  sortBy(sortBy : SortBy, descending : boolean){
    switch (sortBy){
      case SortBy.ID:
        this.heroes.sort((a, b) => a.id - b.id);
        break;
      case SortBy.MONEY:
        this.heroes.sort((a, b) => a.money - b.money);
        break;
      case SortBy.NAME:
        this.heroes.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    if (descending) this.heroes.reverse();
  }


  showHeroForm(){
    const dialogRef = this.dialog.open(HeroFormComponent, {
      width: '250px', data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined)
      this.heroService.addHero({name: result.name, money: result.money, life: result.life, strength: result.strength, items: [] } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
    });
  }
}
