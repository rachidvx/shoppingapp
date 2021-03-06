import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ingredient } from '../shared/ingredient.model'
import {ShoppingListService} from './shopping-list.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients : Ingredient[];
  ingredientsChangedSubscription = new Subscription();

  constructor(private shoppingListService: ShoppingListService) { }
 
  ngOnDestroy(): void {
    this.ingredientsChangedSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    })
  }

  onEditItem(itemIndex){
    this.shoppingListService.startEditing.next(itemIndex);
  }
}
