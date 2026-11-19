var diarioModel = require("../models/diarioModel");

function listarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    diarioModel.listarPorUsuario(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os registros do diário: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function publicar(req, res) {
    var jogo = req.body.jogo;
    var registro = req.body.registro;
    var idUsuario = req.params.idUsuario;

    if (jogo == undefined) {
        res.status(400).send("O nome do jogo está indefinido!");
    } else if (registro == undefined) {
        res.status(400).send("O registro está indefinido!");
    } else if (idUsuario == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        diarioModel.publicar(jogo, registro, idUsuario)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao inserir o registro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function editar(req, res) {
    var novoRegistro = req.body.registro;
    var idDiario = req.params.idDiario;
    var idUsuario = req.params.idUsuario;

    if (novoRegistro == undefined) {
        res.status(400).send("O novo registro está indefinido!");
        return;
    }

    diarioModel.editar(novoRegistro, idDiario, idUsuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao editar o registro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listarPorUsuario,
    publicar,
    editar
};
