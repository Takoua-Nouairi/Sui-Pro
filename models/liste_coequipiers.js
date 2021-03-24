const db=require('../util/database');



module.exports=class user{
    constructor(nom,prenom,numero,email,password,role){
        this.email=email;
        this.password=password;
        this.role=role;
        this.nom=nom;
    this.prenom=prenom;
this.numero=numero
    };
   
    static findCo() {
        return db.execute('SELECT * FROM users WHERE role="co-equipiere"');
      };
      static find(id) {
        return db.execute('SELECT * FROM users WHERE id=?',[id]);
      };

      static delete(id){
        return db.execute('DELETE FROM users WHERE  id= ? ', [id]);
    }
    static update(id,user){
        return db.execute('UPDATE users SET email=? , numero=? where id= ? ', [user.email,user.numero,id]);
    }
    static saveArchive(user) {
        return db.execute(
          'INSERT INTO archive_co (nom,prenom,numero,email,role) VALUES (?, ?,?,?,?) ',
          [user.nom,user.prenom,user.numero,user.email,user.role]
        );
      }

}
