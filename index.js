const express = require('express');
const authRoutes = require('./routes/auth');
const projetsRoutes=require('./routes/projet');
const tachesRoutes=require('./routes/taches');
const liste_coequipiersRoutes = require('./routes/liste_coequipiers');

const db=require('./util/database')
const errorController = require('./controllers/error');
const { route } = require('./routes/auth');

const app = express();

const path=require('path');
const bodyParser = require('body-parser');
const nodemailer=require('nodemailer');
const {google}=require('googleapis');

const ports = process.env.PORT || 3000;
 
app.use(bodyParser.json());



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept, X-Custom-Header, Authorization'
  );
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use('/auth', authRoutes);
app.use('/projets',projetsRoutes);
app.use('/taches',tachesRoutes);
app.use('/liste_co',liste_coequipiersRoutes);


//app.use(errorController.get404);

//app.use(errorController.get500);

app.listen(ports, () => console.log(`Listening on port ${ports}`));

//alert with email 
const CLIENT_ID='200600422891-lm0skd1s6cod9rfsm5db4c7gh69m4o54.apps.googleusercontent.com'
const CLIENT_SECRET='yqPnHn6mC5iF2aKjkX-zs47D'
const REDIRECT_URI='https://developers.google.com/oauthplayground'
const REFRESH_TOKEN='1//04v_aKvcnxFOaCgYIARAAGAQSNwF-L9IrjRlx-qojwZPXgBNBGoJnGv5pA9yAWTcJ96FcTm_kPG3cupDPae5NGtmFm08lr0TaTGs'
const oAuth2Client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

async function sensMail(){
  try{
  const accessToken= await oAuth2Client.getAccessToken();
  const transport=nodemailer.createTransport({
    service:'gmail',
    auth:{
      type:'OAuth2',
      user:'malek.maraghni@esen.tn',
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken
    }
  })
const mailOption={
  from:' SUIPRO <>',
  to:'malek.maraghni@esen.tn',
  subject:"ALERT DDL projet",
  text:'ALERT',
  html:'<h1> DDL dans 3 jours de votre projet {{</h1>'
}
const result=await transport.sendMail(mailOption)
return(result);

  }catch(err){
    return(err);
  }
} 
const schedule = require('node-schedule'); // run event after each execution.

const { getAllprojets } = require('./controllers/projet');
const projets = require('./models/projet');
const mysql = require('mysql');


const db1 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"suipro"

});
// run everyday at midnight
schedule.scheduleJob('0 0 * * *', () => {  
db1.connect(function(err) {
  if (err) throw err;
  db1.query("SELECT * FROM projets", function (err, result, fields) {
    if (err) throw err;
    var d = new Date();  
var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+(d.getDate()-3); 
//console.log(date);
    for (var i = 0; i < result.length; i++) {

      if ( result[i].date_fin == date ){
        nom=result[i].nom_P;
        const mailOption={
          from:' SUIPRO <>',
          to:'malek.maraghni@esen.tn',
          subject:"ALERT DDL projet",
          text:'ALERT',
          html:"<h1> DDL dans 3 jours de votre projet </h1>"+nom,
        }
  //sensMail().then(result=>console.log('Email sent ....',result)).catch((error)=>console.log(error.message));
      }
    };
   
  });
});
 
})


const router=express.Router();

