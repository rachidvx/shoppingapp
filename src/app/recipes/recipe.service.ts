import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
    
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         "Lasagna", 
    //         "test description", 
    //         "https://img.taste.com.au/RCqdtLpm/w720-h480-cfill-q80/taste/2019/08/haloumi-lasagne-153157-2.jpg",
    //         [
    //             new Ingredient("Meat", 10),
    //             new Ingredient("Tomatoes", 3)
    //         ]
    //     ),
    //     new Recipe
    //     (
    //         "Cheescake", 
    //         "test description2", 
    //         "https://images-gmi-pmc.edge-generalmills.com/6624f074-deb4-4ad2-b2d0-ff2a9839c8a7.jpg",
    //         [
    //             new Ingredient("Chees", 4),
    //             new Ingredient("Succer", 20)
    //         ]
    //     )
    // ];

    private recipes: Recipe[] = [];

    setRecipes(recipes: Recipe []) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }    

    getRecipes() : Recipe []{
        return this.recipes.slice();
    }

    getRecipe(index: number): Recipe {
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}