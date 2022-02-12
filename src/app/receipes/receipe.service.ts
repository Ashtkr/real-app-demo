import {  Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Receipe } from './receipe.model'

@Injectable()
export class ReceipeService{
    receipesChanged = new Subject<Receipe[]>();

     private receipes: Receipe[] = [
          new Receipe('A First Receipe','This is simply a Test',
          'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2019_21/2870431/190524-classic-american-cheeseburger-ew-207p.jpg',
          [
              new Ingredient('Fruits' ,12),
              new Ingredient('Onion',10)
          ]),
          new Receipe('A Second Receipe','This is simply a Test',
          'https://www.onmanorama.com/content/dam/mm/en/food/features/images/2021/10/17/pizza.jpg.transform/onm-articleimage/image.jpg',
          [
              new Ingredient('Buns' ,2),
              new Ingredient('Fish',10)
          ])
      
        ];  


    //  private receipes:Receipe[];

      constructor(private slService:ShoppingListService){}

      setReceipes(receipes:Receipe[]){
          this.receipes = receipes;
          this.receipesChanged.next(this.receipes.slice());
      }
      
      getReceipes(){
          return this.receipes.slice();
      }

      getReceipe(index:number){
          return this.receipes[index]
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]){
          this.slService.addIngredients(ingredients)
      }

      addReceipe(receipe:Receipe){
          this.receipes.push(receipe);
          this.receipesChanged.next(this.receipes.slice())
      }

      updateReceipe(index:number,newReceipe:Receipe){
          this.receipes[index] = newReceipe;
          this.receipesChanged.next(this.receipes.slice())
      }

      deleteReceipe(index:number){
          this.receipes.splice(index,1);
          this.receipesChanged.next(this.receipes.slice());
      }
}