import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', { static: false }) shoppingEditForm: NgForm;

  subscriptionEditItem: Subscription;
  editMode: boolean = false;
  editedItemIdex: number;
  editIngredient: Ingredient;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscriptionEditItem = this.shoppingListService.startEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIdex = index;
        this.editIngredient = this.shoppingListService.getIngredient(index);
        this.shoppingEditForm.setValue({
          name: this.editIngredient.name,
          amount: this.editIngredient.amount
        });

      });
  }

  addOrUpdateIngredient(f: NgForm) {
    let newIngredient = new Ingredient(f.value.name, f.value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIdex, newIngredient);
    } else {
      this.shoppingListService.addedIngredient(newIngredient);
    }
    this.resetForm();
  }

  onClear() {
    this.resetForm();
  }

  ngOnDestroy(): void {
    this.subscriptionEditItem.unsubscribe();
  }

  onDelete() {
    this.shoppingListService.removeIngredient(this.editedItemIdex);
    this.resetForm();
  }

  private resetForm() {
    this.shoppingEditForm.reset();
    this.editMode = false;
  }
}
