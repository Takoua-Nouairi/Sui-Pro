const db=require('../util/database');



module.exports=class user{
    constructor(nom,prenom,numero,email,password,role){
        this.email=email;
        this.password=password;
        this.role=role;
        this.nom=nom;
        this.prenom=prenom;
        this.numero=numero;
    };


    static find(email) {
        return db.execute('SELECT * FROM users WHERE email= ?', [email]);
      };
      static findR(email) {
        return db.execute('SELECT role FROM users WHERE email= ?', [email]);
      };
      static findP(password) {
        return db.execute('SELECT password FROM users WHERE password= ?', [password]);
      };
      static save(user) {
        return db.execute('INSERT INTO users (nom,prenom,numero,email, password,role) VALUES ( ?,?,?,?, ?,?)',[user.nom,user.prenom,user.numero,user.email,user.password,user.role]);
      };


/*
    static fetchAll(){
        return db.execute('SELECT * FROM chef_projet ') ;

    }
    static post(email,password){
        return db.execute('INSERT INTO chef_projet (email,password)  VALUES (?,?)', [email,password]);
    }

    static update(email,password){
        return db.execute('UPDATE chef_projet SET password=? where email= ? ', [password,email]);
    }
    static delete(email){
        return db.execute('DELETE FROM chef_projet WHERE  email= ? ', [email]);
    }
    */
}
