import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ReceipeService } from '../receipes/receipe.service';
import { Receipe } from '../receipes/receipe.model';
import { map,tap,take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';


@Injectable({providedIn:'root'})
export class DataStorageService{
    constructor(private http:HttpClient,
        private receipeService:ReceipeService,
        private authService:AuthService){}

    storeReceipes(){
        const receipes = this.receipeService.getReceipes();
        this.http.put(
            'https://ng-course-receipe-book-fc0db-default-rtdb.firebaseio.com/receipes.json',
            receipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchReceipes(){
            return this.http.get<Receipe[]>(
                'https://ng-course-receipe-book-fc0db-default-rtdb.firebaseio.com/receipes.json',
            ).pipe(
        map(receipes => {
            return receipes.map(receipe => {
                return {...receipe,
                     ingredients: receipe.ingredients ? receipe.ingredients : []}
            });
        }),
        tap( receipes => {
            this.receipeService.setReceipes(receipes);
        })
        );
    }
}