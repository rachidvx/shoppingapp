import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {DataStorageService} from '../shared/data-storage.service'
@Component({
    selector: "app-header",
    templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit{

    isAuthenticated = false;
    constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}
    
    ngOnInit(): void {
        this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }
    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }
}