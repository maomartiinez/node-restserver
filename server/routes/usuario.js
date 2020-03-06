const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario'); //esquema de bd

app.get('/usuario', function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Usuario.find({ estado: true }, 'nombre email role estado google img') //condiciones donde { google: true }, segundo argumento que campos queremos mostrar
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }
            Usuario.countDocuments({ estado: true }, (err, conteo) => { //realiza el conteo de registros se cambia Usuario.Count por Usuario.countDocuments
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });
            });



        });

});

app.post('/usuario', function(req, res) {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    }); //Crea ua nueva instancia del schema Usuario 
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }
        //usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']); //Pick regresa una copia del objeto filtrando solo los valores que yo quiero actualizar
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => { //tercer argumento, devuelve el usuario actualizado
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    //Usuario.findByIdAndRemove(id, (err, usuarioEliminado) => { //eliminacion Fisica

    let cambiaEstado = {
        estado: false
    };
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioEliminado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }
        if (!usuarioEliminado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            usuario: usuarioEliminado
        });
    });

});

module.exports = app;