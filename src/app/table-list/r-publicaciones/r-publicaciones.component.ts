import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, Validator } from '@angular/forms';
import { PulicacionService } from '../pulicacion.service';

@Component({
  selector: 'app-r-publicaciones',
  templateUrl: './r-publicaciones.component.html',
  styleUrls: ['./r-publicaciones.component.scss']
})
export class RPublicacionesComponent implements OnInit {
  public form: FormGroup;
  users: any;
  constructor(
    private fb: FormBuilder,
    private publicacionService: PulicacionService,
    public dialogRef: MatDialogRef<RPublicacionesComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.setForm();
  }

  ngOnInit() {
    this.getUsers();
  }

  setForm(): any {
    // console.log(this.data.fullName);
    if (this.data.id) {
      //  console.log (this.data);
      this.form = this.fb.group({
        id: [this.data.id],
        img: [this.data.img],
        titulo: [this.data.titulo],
        cuerpo: [this.data.cuerpo],
        ofertaMinima: [this.data.ofertaMinima],
        ofertaMaxima: [this.data.ofertaMaxima],
        habilidades: [this.data.habilidades],
        autor: [this.data.autor],
        // createdAt: [this.data.createdAt, Validators.required],
        // UpdateAt: [this.data.UpdateAt, Validators.required]
      });
    } else {
      this.form = this.fb.group({
        // id: undefined,
        img: [''],
        titulo: [''],
        cuerpo: [''],
        ofertaMinima: [0],
        ofertaMaxima: [0],
        habilidades: [''],
        autor: [0],
        // createdAt: [0, Validators.required],
        // UpdateAt: [0, Validators.required]
      });
    }

  }

  addPublicaciones() {
    if (this.form.valid) {


      if (this.data.id) {
        // update User
        console.log('update publicacion');
        console.log(this.form.value.id);

        this.publicacionService.updatePublicacion(this.form.value).subscribe(
          res => {
            this.closeDialog();
          },
          err => console.error(err)
        );

      } else {
        // adding User
        console.log('adding publicacion');
        console.log(this.form.value);

        this.publicacionService.addPublicacion(this.form.value).subscribe(
          res => {
            this.closeDialog();
          },
          err => console.error(err)
        );
      }
    }
  }

  getUsers() {
      this.publicacionService.getUsers().subscribe(
        res => {
          this.users = res;
          this.setForm();
          console.log(this.users);
        },
        err => {
          console.error(err);
        }
      )
  }


  closeDialog(): void {
    this.form.reset();
    this.dialogRef.close();
  }

}
