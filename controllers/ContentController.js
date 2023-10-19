import Content from "../models/ContentModel.js";
import path from 'path';
import fs from 'fs';

export const getContents = async(req, res) => {
   try {
        const response = await Content.findAll();
        //console.log()
        res.set({
            "Access-Control-Allow-Origin": "http://localhost:5173",
            // "Access-Control-Allow-Credentials": true
        }).json(response);
    } catch(error) {
        console.log(error.message);
    }
}

export const getContentById = async(req, res) => {
    try {
        const response = await Content.findOne({
            where:{
                id: req.params.id
            }
        });
        res.set({
            "Access-Control-Allow-Origin": "http://localhost:5173",
            // "Access-Control-Allow-Credentials": true,
        }).json(response);
    } catch(error) {
        console.log(error.message);
    }
}

export const saveContent = (req, res) => {
    if(req.files === null) return res.set({
        "Access-Control-Allow-Origin": "http://localhost:5173",
        "Access-Control-Allow-Credentials": true,
        // 'Access-Control-Allow-Headers': 'Origin'
    }).status(400).json({msg: "Le fichier n'est pas charger"});
    const name = req.body.texte;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];
    if(!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({msg: "Le format de l'image n'est valide!"});
    if(fileSize > 5000000) return res.status(422).json({msg: "L'image doit avoir une capacite inferieur a 5MB"});
    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Content.create({name: name, image: fileName, url: url});
            res.status(201).json({msg: "Votre contenu a été crée avec succès "})
        }catch (error){
            console.log(error.message);
        }
    })
}

export const updateContent = async(req, res) => {
    const contenu = await Content.findOne({
        where:{
            id: req.params.id
        }
    });
    if(!contenu) return res.status(404).json({msg: "Il n'y a aucune donnée"});
    let fileName = "";
    if(req.files === null) {
        fileName = Content.image;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if(!allowedType.includes(ext.toLocaleLowerCase())) return res.set({
            "Access-Control-Allow-Origin": "http://localhost:5173",
            // "Access-Control-Allow-Credentials": true,
            // 'Access-Control-Allow-Headers': 'Origin'
        }).status(422).json({msg: "Le format de l'image n'est valide!"});
        if(fileSize > 5000000) return res.status(422).json({msg: "L'image doit avoir une capacite inferieur a 5MB"});

        const filepath = `./public/images/${contenu.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err) => {
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const name = req.body.texte;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try{
        await Content.update({name: name, image: fileName, url: url}, {
            where: {
                id: req.params.id
            }
        });
        res.set({
            "Access-Control-Allow-Origin": "http://localhost:5173",
            // "Access-Control-Allow-Credentials": true,
            // 'Access-Control-Allow-Headers': 'Origin'
        }).status(200).json({msg: "Contenu mis a jour avec succès"})
    } catch(error) {
        console.log(error.message)
    }
}

export const deleteContent = async(req, res)=>{
    const contenu = await Content.findOne({
        where:{
            id: req.params.id
        }
    });
    if(!contenu)
    {
        return res.set({
            "Access-Control-Allow-Origin": "http://localhost:5173",
            // "Access-Control-Allow-Credentials": true,
            // 'Access-Control-Allow-Headers': 'Origin'
        }).status(404).json({msg: "Il n'y a aucune donnée"});
    }
    try{
        const filepath = `./public/images/${contenu.image}`;
        fs.unlinkSync(filepath);
        // app.options('/contents/:id', cors());
        await Content.destroy({
                where:{
                    id: req.params.id
                }
            });
            res.set({
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "Access-Control-Allow-Credentials": true,
                // 'Access-Control-Allow-Headers': 'Origin'
            }).status(200).json({msg: "Centenu supprimer avec succès"})
        }catch(error){
            console.log(error.message);
        }
}
