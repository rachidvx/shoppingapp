import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeItemDetail: Recipe;
  recipeItemIdex: number;

  constructor(private shoppinglistService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe((param: Params) => {
      this.recipeItemIdex = +param['id'];
      this.recipeItemDetail = this.recipeService.getRecipe(+param['id']);
    });
  }

  addToShoppingList() {
    this.shoppinglistService.addedIngredients(this.recipeItemDetail.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeItemIdex);
    this.router.navigate(['recipes']);
  }
}
