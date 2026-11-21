var quizModel = require('../models/quizModel');

function salvarResultado(req, res) {
    const idUsuario = req.body.idUsuario;
    const terror = req.body.terror;
    const roguelike = req.body.roguelike;
    const acao = req.body.acao;
    const historia = req.body.historia;
    const fps = req.body.fps;
    const rpg = req.body.rpg;
    const puzzle = req.body.puzzle;
    const ritmo = req.body.ritmo;
    const foco = req.body.foco;

    if (idUsuario == undefined) {
        res.status(400).send('idUsuario está undefined');
        return;
    }

    // Simples validação de campos numéricos
    try {
        quizModel.salvarOuAtualizar(idUsuario, terror, roguelike, acao, historia, fps, rpg, puzzle, ritmo, foco)
            .then(function(resultado) {
                res.status(200).json({ message: 'Resultado salvo' });
            }).catch(function(erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

function buscarResultado(req, res) {
    const idUsuario = req.params.idUsuario;
    if (idUsuario == undefined) {
        res.status(400).send('idUsuario está undefined');
        return;
    }

    quizModel.buscarPorUsuario(idUsuario)
        .then(function(resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(204).send('Nenhum resultado encontrado');
            }
        }).catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    salvarResultado,
    buscarResultado
};
