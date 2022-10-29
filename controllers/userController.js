let User = require('../models/user')
var randomstring = require("randomstring");

const qr = require('qrcode')


exports.user_list = function(req, res){
    User.allUsers(function(err,users){
        console.log(users)
        res.render('showAllUsers', {Users: users})
    })
    
}

exports.user_create = function(req, res){
    let user = new User({email:req.body.email, name:req.body.name, codigo:randomstring.generate(), status:"registrado"})
    console.log(user)
    User.add(user)
    res.send("Usuario creado exitosamente")
}

exports.user_find = function(req, res){
    User.findByEmail(req.body.email, function(err, usuario){
        if(usuario != undefined){
            qr.toDataURL(usuario.codigo, (err, src) => {
                if (err) res.send("Error occured while generating QR");
                // Let us return the QR code image as our response and set it to be the source used in the webpage
                res.render('userProfile', {User:usuario, Src:src})
            });
            
        }else{
            res.send('No se encontro dicho usuario')
        }
    })
}

exports.user_find_by_qr = function(req, res){
    console.log(req.body)
    User.findByQr(req.body.codigo, function(err, usuario){
        if(usuario != undefined){
            qr.toDataURL(usuario.codigo, (err, src) => {
                if (err) res.send("Error occured while generating QR");
                // Let us return the QR code image as our response and set it to be the source used in the webpage
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(usuario))
            });
            
        }else{
            res.send('No se encontro dicho usuario')
        }
    })
}

exports.registerUser = function(req, res){
    console.log(req.body)
    User.registerUser(req.body, function(err, usuario){
        if(usuario != undefined){
            res.send('Usuario registrado con exito');
        }else{
            res.send('Error al registrar usuario')
        }
    })
}
    



