import ContentRoute from './routes/ContentRoute.js';
import BtpRoute from './routes/BtpRoute.js';
import HotelRoute from './routes/HotelRoute.js';
import BackgroundRoute from './routes/BackgroundRoute.js';
import express from 'express'
import mysql from 'mysql';
import cors from 'cors';

import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import FileUpload from "express-fileupload";

const app = express();

// app.use(express.json());
app.all("/", (req, res)=>{
    res.send("ebath backend running good and changing")
})
app.use(cookieParser());
app.use(FileUpload());
app.use(express.static('public'))
app.use(cors(
    {
        // origin: ['header'],
        origin: ['http://localhost:5173'],
        methods: ['POST', 'GET', 'DELETE', 'PUT'],
        credentials: true
        // allowedHeaders: ['*'],
    }
));
app.use(ContentRoute);
app.use(BtpRoute);
app.use(HotelRoute);
app.use(BackgroundRoute);

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ebath_btp"
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Message: "vous avez besoin du token."})
    } else {
        jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decoded)=>{
            if(err) {
                return res.json({Message: "Erreur d'authentification"})
            } else {
                req.name = decoded.name;
                next();
            }
        })
    }
}

app.get("/",verifyUser, (req, res) => {
    return res.json({Status: "succes", name: req.name})
})

// login
app.post("/login", (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err) return res.json({Message: "Erreur de serveur!"});
        if(data.length > 0) {
            const name = data[0].name;
            const token = jwt.sign({name}, "our-jsonwebtoken-secret-key", {expiresIn: "1d"});
            res.cookie("token", token);
            return res.json({Status: "succes"})
        } else {
            return res.json({Message: "cet utilisateur n'existe pas"});
        }
    })
})
// logout
app.get("/logout", (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "succes"})
})

// inserer des donnees dans la table contact
app.post("/contact", (req, res) =>{
    const sql = "INSERT INTO contacts (`objet`, `email`, `phone`, `message`) VALUES (?)";
    const values = [
        req.body.objet,
        req.body.email,
        req.body.phone,
        req.body.message,
    ]
    db.query(sql, [values], (err, data) =>{
        if(err){
            res.json("error")
        }else{
            res.json(data)
        }
    })
})


// afficher les donnes de la table contacts
app.get("/afficheContact", (req, res)=>{
    const sql = "SELECT * FROM contacts";
    db.query(sql, (err, data)=>{
        if(err){
            res.json(err);
        }else{
            res.json(data)
        }
    })
})

//supprimer un contact
app.delete("/supContact/:id", (req, res) =>{
    const sql = "DELETE FROM contacts WHERE ID = ?";

    const id = req.params.id;

    db.query(sql, [ id], (err, data) =>{
        if(err){
            res.json("error")
        }else{
            res.json(data)
        }
    })
})

// inserer des donnees dans la table commentaires
app.post("/commentForUs", (req, res) =>{
    const sql = "INSERT INTO commentaires (`name`, `email`, `phone`, `comment`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.comment,
    ]
    db.query(sql, [values], (err, data) =>{
        if(err){
            res.json("error")
        }else{
            res.json(data)
        }
    })
})

// afficher les donnes de la table commentaires
app.get("/afficheCommentaires", (req, res)=>{
    const sql = "SELECT * FROM commentaires";
    db.query(sql, (err, data)=>{
        if(err){
            res.json(err);
        }else{
            res.json(data)
        }
    })
})

//supprimer un contact
app.delete("/supCommentaires/:id", (req, res) =>{
    const sql = "DELETE FROM commentaires WHERE ID = ?";

    const id = req.params.id;

    db.query(sql, [ id], (err, data) =>{
        if(err){
            res.json("error")
        }else{
            res.json(data)
        }
    })
})

// inserer des donnees dans la table abonnes
app.post("/sendYourMail", (req, res) =>{
    const sql = "INSERT INTO abonnes (`email`) VALUES (?)";
    const values = [
        req.body.email,
    ]
    db.query(sql, [values], (err, data) =>{
        if(err){
            res.json("error")
        }else{
            res.json(data)
        }
    })
})

// afficher les donnes de la table commentaires
app.get("/afficheAbonnes", (req, res)=>{
    const sql = "SELECT * FROM abonnes";
    db.query(sql, (err, data)=>{
        if(err){
            res.json(err);
        }else{
            res.json(data)
        }
    })
})

//supprimer un contact
app.delete("/supAbonnes/:id", (req, res) =>{
    const sql = "DELETE FROM abonnes WHERE ID = ?";

    const id = req.params.id;

    db.query(sql, [ id], (err, data) =>{
        if(err){
            res.json("error")
        }else{
            res.json(data)
        }
    })
})


app.listen(3000, () => {
    console.log("Démarrage de mon serveur sur le port 3000")
})
