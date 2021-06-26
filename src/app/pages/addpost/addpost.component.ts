import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { AuthService } from 'src/app/services/auth.service';
import { finalize} from "rxjs/operators"

// firebase
import {AngularFireStorage} from "@angular/fire/storage"
import {AngularFireDatabase} from "@angular/fire/database"


import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

  locationName?:String;
  description?:String;
  picture:any = null;



  user:any = null
  uploadPercent?:number;

  constructor(
    private toastr:ToastrService,
    private auth : AuthService,
    private router: Router,
    private db:AngularFireDatabase,
    private storage:AngularFireStorage

  ) { 
    auth.getUser().subscribe(
      (user)=>{
        this.db.object(`/users/${user?.uid}`)
        .valueChanges()
        .subscribe(
          (user)=>{
            this.user = user
          }
        )
      }
    )

  }

  ngOnInit(

   
  ): void {
  }

  onSubmit(){
    const uid = uuidv4()

    this.db.object(`/posts/${uid}`).set({
      id:uid,
      locationName:this.locationName,
      description: this.description,
      pictures:this.picture,
      by:this.user.name,
      instaId:this.user.instaUserName,
      date:Date.now()
    }).then(()=>{
      this.toastr.success("Post added successfully")
      this.router.navigateByUrl("/")
    })
    .catch((err)=>{
      this.toastr.error("oopss")
    })

  }

  uploadFile(event:any){
    const file = event.target.files[0]

    const filePath = file.name;
    const fileRef =this.storage.ref(filePath)
    const task = this.storage.upload(filePath,file)

        task.percentageChanges().subscribe((percentage)=>{
          this.uploadPercent = percentage
        });

        task.snapshotChanges()
        .pipe(
          finalize(()=>{
            fileRef.getDownloadURL().subscribe((url)=>{
              this.picture = url;
              this.toastr.success("image upload success")
            })
          })  
        ).subscribe(
          (data)=>{
            console.log(data)
          },
          (err)=>{
            console.log(err)
          }
        )

  }

}
