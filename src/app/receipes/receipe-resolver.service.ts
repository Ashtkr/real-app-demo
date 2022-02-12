import { Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Receipe } from './receipe.model';
import { DataStorageService } from '../shared/data-storage.service'
import { Observable } from 'rxjs';
import { ReceipeService } from './receipe.service';

@Injectable({providedIn:'root'})
export class ReceipeResolverService implements Resolve<Receipe[]>{
    constructor(private dataStorageService: DataStorageService,
                private receipeServie: ReceipeService) {      
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const receipes = this.receipeServie.getReceipes();

        if(receipes.length === 0){
            return this.dataStorageService.fetchReceipes();
        }else{
            return receipes;
        }
    }
}