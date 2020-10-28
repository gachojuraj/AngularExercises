import { Injectable } from '@angular/core';
import { Item } from './item';
import { ITEMS } from './mock-items';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private messageService: MessageService) { }
  
  public getItems(): Observable<Item[]>{
    this.messageService.add("ItemService: fetched items");
    return of(ITEMS);
  }
}
