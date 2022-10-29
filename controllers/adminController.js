let Admin = require('../models/admin')


exports.admin_create = function(req, res){
    let admin = new Admin(req.body.email, req.body.password, req.body.name)
    Admin.add(admin)
    res.status(200).json({
        admin: admin
    })
}

exports.admin_find = function(req, res){
    Admin.find({email: req.body.email}, function(err, usuario){
        res.status(200).json({
            usuario: usuario
        })
    })
}

exports.user_list = function(req, res){
    User.allUsers(function(err,users){
        console.log(users)
        res.render('showAllUsers', {Users: users})
    })
    
}

exports.login = function(req, res){
    Admin.findByEmail(req.body.email, function(err, usuario){
        console.log(usuario)
        if(usuario === null){
            return res.send("Usuario no encontrado")
        } else{
            if(usuario.password === req.body.password){
                res.redirect('/users/showAll')
            }else{
                res.send("Contraseña Incorrecta");
            }
        }
        
    })
}