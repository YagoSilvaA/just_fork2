import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IntranetService } from "../../intranet.service";

@Component({
    selector: 'app-post-restaurant',
    templateUrl: './post-restaurant.component.html',
    styleUrls: ['./post-restaurant.component.scss']
})

export class PostRestaurantComponent implements OnInit {
    isRegVisible = true;
    selectedFile: File | any = null;
    formGroup: FormGroup | any;
    patchGroup: FormGroup | any;
    private imageUrl: string = ""; 
    constructor(private intranetService: IntranetService, private http: HttpClient) {}

    ngOnInit(){
        this.initForm();
        this.patchForm(); 
    }

    initForm(){
        this.formGroup = new FormGroup({
            restaurant_name: new FormControl('', [Validators.required]),
            ubication: new FormControl('', [Validators.required])
        })
    }

    patchForm(){
        this.patchGroup = new FormGroup({
            restaurant_name: new FormControl(''),
            ubication: new FormControl(''),
            imageUrl: new FormControl('') 
        })
    }

    postRestaurant(){
        if(this.formGroup.valid){ 
            this.intranetService.postRestaurants(this.formGroup.value).subscribe(result => {
                if(result){
                    console.log(result);
                }
            })
        }
    }

    patchRestaurant(){
        if(this.patchGroup.valid){
            this.patchGroup.value.imageUrl = this.imageUrl; 
            this.intranetService.patchRestaurant(this.patchGroup.value).subscribe(result => {
                if(result){
                    console.log(result);
                }
            })
        }
    }

    onFileSelected(event: any){
        this.selectedFile = <File>event.target.files[0];
    }

    postImage(){
        const fd = new FormData;
        fd.append('image', this.selectedFile, this.selectedFile.name);
        this.intranetService.postImage(fd).subscribe(result => {
            if(result){
                console.log(result.url)
                this.imageUrl = "localhost:7899/uploads/" + result.url; 
            }
        })
    }
}