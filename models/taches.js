const db=require('../util/database');


module.exports=class taches{
    constructor(id_t,nom_t,description,date_debut,date_fin,id_p,id_co,etat){
        this.id_t= id_t;
        this.nom_t=nom_t;
        this.description=description;
        this.date_debut=date_debut;
        this.date_fin=date_fin;
        this.id_p= id_p;
        this.id_co= id_co;  
        this.etat=etat;  
    };

   
    
    static fetchAll(){
        return db.execute('SELECT t.id_t,t.nom_t,t.description,t.date_debut,t.date_fin, t.id_p,t.id_co,t.etat , p.nom_P , u.email , p.id_P , u.id  FROM taches t ,projets p ,users u where t.id_P=p.id_P and t.id_co=u.id ') ;

    }
   
    static Select(){
        return db.execute('SELECT t.id,t.nom_t,t.description,t.date_debut,t.date_fin, t.id_p,t.id_co,t.etat , p.nom_P , u.email , p.id_P , u.id  FROM archive_taches t ,projets p ,users u where t.id_P=p.id_P and t.id_co=u.id and t.etat="Done" ') ;

    }
    static post(nom_t,description,date_debut,date_fin,id_p,id_co,etat){
        return db.execute('INSERT INTO taches (nom_t,description,date_debut,date_fin,id_p,id_co,etat)  VALUES (?,?,?,?,?,?,?)', [nom_t,description,date_debut,date_fin,id_p,id_co,etat]);
    } 

    
    static update(id_t,taches){
        return db.execute('UPDATE taches SET nom_t=?,description=? , date_debut=?,date_fin=?,id_p=?,id_co=? , etat=? where id_t= ? ', [taches.nom_t,taches.description,taches.date_debut,taches.date_fin,taches.id_p,taches.id_co,taches.etat,id_t]);
    }
    static updateE(id_t,etat){
        return db.execute('UPDATE taches SET  etat=? where id_t= ? ', [etat,id_t]);
    }
    static delete(id_t){
        return db.execute('DELETE FROM taches WHERE  id_t= ? ', [id_t]);
    }
    static save(taches) {
        return db.execute(
          'INSERT INTO taches (nom_t,description,date_debut,date_fin,id_p,id_co,etat) VALUES (?, ?,?,?,?,?,?) ',
          [taches.nom_t,taches.description,taches.date_debut,taches.date_fin,taches.id_P,taches.id_co,taches.etat]
        );
      }
      static saveArchive(taches) {
        return db.execute(
          'INSERT INTO archive_taches (nom_t,description,date_debut,date_fin,id_p,id_co,etat) VALUES (?, ?,?,?,?,?,?) ',
          [taches.nom_t,taches.description,taches.date_debut,taches.date_fin,taches.id_P,taches.id_co,taches.etat]
        );
      }
    
}
