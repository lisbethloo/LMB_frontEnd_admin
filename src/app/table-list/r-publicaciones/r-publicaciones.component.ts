import { Component, OnInit, Inject, Optional  } from '@angular/core';
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
  constructor(
    private fb: FormBuilder,
    private publicacionService: PulicacionService,
    public dialogRef: MatDialogRef<RPublicacionesComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.setForm();
    }

  ngOnInit() {
  }

  setForm(): any {
    // console.log(this.data.fullName);
      if (this.data.id) {
      //  console.log (this.data);
         this.form = this.fb.group({
              id: [this.data.id, Validators.required],
              img: [this.data.img, Validators.required],
              titulo: [this.data.titulo, Validators.required],
              cuerpo: [this.data.cuerpo, Validators.required],
              ofertaMinima: [this.data.ofertaMinima, Validators.required],
              ofertaMaxima: [this.data.ofertaMaxima, Validators.required],
              habilidades: [this.data.habilidades, Validators.required],
              // autor: [this.data.autor, Validators.required],
              createdAt: [this.data.createdAt, Validators.required],
              UpdateAt: [this.data.UpdateAt, Validators.required]
         });
     } else {
       this.form = this.fb.group({
              img: ['', Validators.required],
              titulo: ['', Validators.required],
              cuerpo: ['', Validators.required],
              ofertaMinima: [0, Validators.required],
              ofertaMaxima: [0, Validators.required],
              habilidades: ['', Validators.required],
            //  autor: [0, Validators.required],
              createdAt: [0, Validators.required],
              UpdateAt: [0, Validators.required]
       });
     }

    }

    addPublicaciones() {
      if (this.form.valid) {


        if (this.data.id) {
           // update User
           console.log('update publicacion');
           console.log(this.form.value);

           this.publicacionService.updatePublicacion(this.form.value).subscribe(
            res => console.log(res),
            err => console.error(err)
          );

        } else {
           // adding User
           console.log('adding publicacion');
           console.log(this.form.value);

           this.publicacionService.addPublicacion(this.form.value).subscribe(
            res => console.log(res),
            err => console.error(err)
          );
    }
  }
}

    closeDialog(): void {
      this.form.reset();
      this.dialogRef.close();
    }

}
