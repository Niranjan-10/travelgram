import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {AngularFireDatabase} from "@angular/fire/database"



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users = []
  posts?:any = []

  isLoading = false;

  constructor(
    private toastr:ToastrService,
    private db: AngularFireDatabase

  ) { 

    this.isLoading = true

    //  get all users
    db.object('/users')
    .valueChanges()
    .subscribe(
      (obj:any)=>{
        if(obj){
          this.users = Object.values(obj)
          console.log(this.users);
          this.isLoading = false

          
        }else{
          toastr.error("No user Found")
          this.users = [] 
          this.isLoading = false
        }
      }

    )

    // grab all the posts
    db.object('/posts')
    .valueChanges()
    .subscribe(
      (obj:any)=>{
        if(obj){
          this.posts = Object.values(obj).sort((a:any,b:any)=> b.date-a.date)
          this.isLoading = false
        }else{
          toastr.error("No post to display")
          this.posts = []
          this.isLoading = false
        }
      }
    )
    

  }

  ngOnInit(): void {
  }

}
