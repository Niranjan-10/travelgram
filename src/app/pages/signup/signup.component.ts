import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { AuthService } from 'src/app/services/auth.service';
import { finalize} from "rxjs/operators"

// firebase
import {AngularFireStorage} from "@angular/fire/storage"
import {AngularFireDatabase} from "@angular/fire/database"

//  image resizer
import {NgxImageCompressService} from 'ngx-image-compress';
import { AngularFireAuth } from '@angular/fire/auth';
import { identifierModuleUrl } from '@angular/compiler';

const config = {
  quality: 0.5,
  maxWidth: 800,
  maxHeight: 600,
  autoRotate: true,
  debug: true
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  picture:String = "https://learnyst.s3.amazonaws.com/assets/schools/2410/resources/images/logo_lco_i3oab.png";

  compressedImage:any;

  uploadPercent?:number ;

  constructor(
    private imageCompress: NgxImageCompressService,
    private auth:AuthService,
    private router:Router,
    private db:AngularFireDatabase,
    private storage: AngularFireStorage,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
  }


  onSubmit(f:NgForm){

    const {email,password, username, country, bio,name} = f.form.value;

    // further sanitization

    this.auth.signUp(email,password)
    .then(
      (res)=>{


        console.log(res);

        const user = res!.user;

        this.db.object(`/users/${user?.uid}`)
        .set({
          id:user?.uid,
          name: name,
          email:email,
          instaUserName: username,
          country: country,
          bio:bio,
          picture:this.picture
        })
        
      }

    )
    .then(
      ()=>{
        this.router.navigateByUrl('/')
        this.toastr.success("Signup success")
      }

    )
    .catch(
      (err)=>{
        this.toastr.error("Signup error")
      }
    )

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
