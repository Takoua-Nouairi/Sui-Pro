const db=require('../util/database');


module.exports=class projets{
    constructor(id_P,nom_P,Pole,nb_taches,date_debut,date_fin,etat){
        this.id_P= id_P;
        this.nom_P=nom_P;
        this.Pole=Pole;
        this.nb_taches=nb_taches;
        this.date_debut=date_debut;
        this.date_fin=date_fin;
        this.etat=etat
    };

    static find(nom_P) {
        return db.execute('SELECT id_P FROM projets WHERE nom_P= ?', [nom_P]);
      };
      static findNomP(nom_P) {
        return db.execute('SELECT * FROM projets WHERE nom_P= ?', [nom_P]);
      };

    static fetchAll(){
        return db.execute('SELECT * FROM projets ') ;

    }

    static Select(){
        return db.execute('SELECT * FROM archive_projets') ;

    }
    static post(nom_P,Pole,nb_taches,date_debut,date_fin,etat){
        return db.execute('INSERT INTO projets (nom_P,Pole,nb_taches,date_debut,date_fin,etat)  VALUES (?,?,?,?,?,?)', [nom_P,Pole,nb_taches,date_debut,date_fin,etat]);
    }   

    static update(id_P,projets){
        return db.execute('UPDATE projets SET nom_P=? ,Pole=?,nb_taches=?,date_debut=?,date_fin=?,etat=? where id_P= ? ', [projets.nom_P,projets.Pole,projets.nb_taches,projets.date_debut,projets.date_fin,projets.etat,id_P]);
    }
    static delete(id_P){
        return db.execute('DELETE FROM projets WHERE  id_P= ? ', [id_P]);
    }
    static save(projets) {
        return db.execute(
          'INSERT INTO projets (nom_P,Pole,nb_taches,date_debut,date_fin,etat) VALUES (?,?,?,?,?,?)',
          [projets.nom_P,projets.Pole ,projets.nb_taches,projets.date_debut,projets.date_fin,projets.etat]
        );
      }
      static saveArchive(projets) {
        return db.execute(
          'INSERT INTO archive_projets (nom_P,Pole,nb_taches,date_debut,date_fin,etat) VALUES (?,?,?,?,?,?)',
          [projets.nom_P,projets.Pole ,projets.nb_taches,projets.date_debut,projets.date_fin,projets.etat]
        );
      }
}
