import { Component, OnInit } from "@angular/core";
import { PublicService } from "../../public.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    
    restaurants: any;

    constructor(private publicService: PublicService) {}

    ngOnInit(){
        this.getRestaurants();
    }

    getRestaurants(){
        this.publicService.getRestaurants().subscribe(
            response => this.restaurants = response,
            error => console.log(error)
        )
    }
}