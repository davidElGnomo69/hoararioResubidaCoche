import { MateriaHoras } from './../model/materiaHoras';
import { Injectable } from '@angular/core';
import { SqliteDbCopy } from '@ionic-native/sqlite-db-copy/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatosServicesService {



  db: SQLiteObject;
  isOpen = false;
  private _dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private plat: Platform, public storage: SQLite, public sqliteDbCopy: SqliteDbCopy) {
    this.plat.ready().then(() => {
      this.sqliteDbCopy
        .copy('Horario16a.db', 0)
        .then((res: any) => console.log('copiando bbd correcto', res))
        .catch((error: any) => console.error('copiando bbdd error', error));
      if (!this.isOpen) {
        this.storage = new SQLite();
        this.storage
          .create({ name: 'Horario16a.db', location: 'default', createFromLocation: 1 })
          .then((db: SQLiteObject) => {
            console.log('entro bien en el create');
            this.db = db;
            this.isOpen = true;
            this.dbReady.next(true);
          })
          .catch(() => console.log('create me echa de aqui'));
      }
    });
  }

  isDataBaseRdy() {
    return this.dbReady.asObservable();
  }

  getEstudios(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.db
        .executeSql('SELECT * FROM estudios', [])
        .then((data) => {
          console.log('entro en studies');
          if (data.rows.length > 0) {
            let arrayEstudios = [];
            for (var i = 0; i < data.rows.length; i++) {
              arrayEstudios.push({
                idEstudios: data.rows.item(i).idEstudios,
                nombre: data.rows.item(i).nombre
              });
            }
            console.log(arrayEstudios);
            resolve(arrayEstudios);
          }
        })
        .catch((error) => {
          console.log('error al leer studies ', error);
          reject(error);
        });
    });
  }

  getGrupos(studies: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.db
        .executeSql(
          'SELECT * FROM grupo WHERE grupo.idEstudios = (SELECT idEstudios from estudios WHERE estudios.nombre = ?)',
          [studies]
        )
        .then((data) => {
          console.log('entro en groups');
          if (data.rows.length > 0) {
            let arrayGrupo = [];
            for (var i = 0; i < data.rows.length; i++) {
              arrayGrupo.push({
                idGrupo: data.rows.item(i).idGrupo,
                nombre: data.rows.item(i).nombre
              });
            }
            console.log(arrayGrupo);
            resolve(arrayGrupo);
          }
        })
        .catch((error) => {
          console.log('error al leer groups', error);
          reject(error);
        });
    });
  }

  getHorario(idGrupo: string) {
    const orden = `select busqueda.eIdDiaSemana as dia,idHorasSemana as hora,dNombre as nombre from (SELECT p.idDiaClase as pIdDiaClase,
      p.idHorasSemana as pIdHorasSemana,
      p.idHoraClase as pIdHoraClase,
      c.idmatsem as cIdMatSem,
      c.idHoraClase as cIdHoraClase,
      c.idMateria as cIdMateria,
      d.idMateria as dIdMateria,
      d.nombre as dNombre,
      e.idGrupo as eIdGrupo,
      e.idDiaClase as eIdDiaClase,
      e.idDiaSemana as eIdDiaSemana,
      f.idDiaSemana as fIdDiaSemana,
      f.nombre as fNombre,
      completo,
      g.*
  FROM
      (select h.* from horaClase as h where idHoraClase in (select idHoraClase from materiahoraclase where idHoraClase in (select idHoraClase from horaClase where idDiaClase in (select idDiaClase from diaClase where idGrupo=?))))as p
  INNER JOIN materiahoraclase as c ON c.idHoraClase = p.idHoraClase 
  INNER JOIN materia as d ON c.idMateria = d.IdMateria
  INNER JOIN diaClase as e ON e.idDiaClase = p.idDiaClase
  INNER JOIN diaSemana as f ON f.idDiaSemana = e.idDiaSemana
  INNER JOIN horasSemana as g ON g.idHorasSemana = p.idHorasSemana) as busqueda;`;
    return new Promise((resolve, reject) => {
      this.db.executeSql(orden, [idGrupo])
        .then(
          (data) => {
            console.log('entro en el select all users');
            let arrayEstudios = [];
            if (data.rows.length > 0) {
              for (var i = 0; i < data.rows.length; i++) {
                arrayEstudios.push({
                  dia: data.rows.item(i).dia,
                  hora: data.rows.item(i).hora,
                  nombre: data.rows.item(i).nombre,

                });
              }
              console.log(arrayEstudios);
              resolve(arrayEstudios);
            }
          })
        .catch((error) => {
          console.log('error al leer all users ', error)
          reject(error);
        }
        )
    })


  }

  convertToHorario(item) {
    let base = this.generarMatriz();
    let dia = 0;
    let hora = 0;
    for (var i = 0; i < item.length; i++) {
      dia = parseInt(item[i].dia.trim()) - 1;
      hora = (item[i].hora - 1);
      base[hora][dia].materia.push(item[i].nombre);
    }
    console.log(base);
    return base;
  }

  private generarMatriz() {
    var messages: Array<MateriaHoras[]> = new Array(6);
    for (var i = 0; i < messages.length; i++) {
      var arrayTu: Array<MateriaHoras> = new Array(5);
      for (var j = 0; j < arrayTu.length; j++) {
        arrayTu[j] = new MateriaHoras([]);
      }
      messages[i] = arrayTu;
    }
    return messages;
  }

  async getDescription(materia: string[]) {
    let mensaje: string[] = [];
    for (var i = 0; i < materia.length; i++) {
      await this.getDescripcionPromesa(materia[i]).then((data: any) => {
        mensaje.push(data[0].completo);
      }).catch(() => {
        return null;
      });
    }
    return mensaje;

  }

  private getDescripcionPromesa(materia: string) {
    return new Promise((resolve, reject) => {
      this.db.executeSql("select completo from materia where nombre=?", [materia])
        .then(
          (data) => {
            console.log('entro en el select all users');
            if (data.rows.length > 0) {
              let arrayEstudios = [];
              for (var i = 0; i < data.rows.length; i++) {
                arrayEstudios.push({
                  completo: data.rows.item(i).completo,
                });
              }
              console.log(arrayEstudios);
              resolve(arrayEstudios);
            }
          })
        .catch((error) => {
          console.log('error al leer all users ', error)
          reject(error);
        }
        )

    })
  }

  /**
   * Getter dbReady
   * @return {BehaviorSubject<boolean> }
   */
  public get dbReady(): BehaviorSubject<boolean> {
    return this._dbReady;
  }

  /**
   * Setter dbReady
   * @param {BehaviorSubject<boolean> } value
   */
  public set dbReady(value: BehaviorSubject<boolean>) {
    this._dbReady = value;
  }

}
