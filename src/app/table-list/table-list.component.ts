import { Component, OnInit } from '@angular/core';
import {PulicacionService} from './pulicacion.service';
import {IPublicaciones} from './publicaciones';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { RPublicacionesComponent } from './r-publicaciones/r-publicaciones.component';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  Publicacion: IPublicaciones;
  constructor(private pulicacionService: PulicacionService,
    public dialog: MatDialog ) { }

  ngOnInit() {
    this.getPublicaciones();
  }

  // material dialog
  openDialog(data: any = {}): void {
    // sconsole.log(data)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';

    dialogConfig.data = data ? data : undefined;

    const dialogRef = this.dialog.open(RPublicacionesComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
     // console.log('The dialog was closed');
      this.getPublicaciones()
    });
  }


  getPublicaciones() {
      this.pulicacionService.getPublicacion().subscribe(
        data => {
          this.Publicacion = data
          console.log(this.Publicacion);
        },
        err => {
          console.error(err)
        }
      );
  }

  delPublicaciones(publicacion: any ) {

    this.pulicacionService.delPublicaciones(publicacion).subscribe(
      res => {
          this.getPublicaciones();
      },
      err => {
          console.error(err);
      }
    );
  }

}
