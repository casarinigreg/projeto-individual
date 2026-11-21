var database = require('../database/config');

function salvarOuAtualizar(idUsuario, terror, roguelike, acao, historia, fps, rpg, puzzle, ritmo, foco) {
    console.log('ACESSEI O QUIZ MODEL - salvarOuAtualizar', idUsuario);

    var instrucaoSql = `
        INSERT INTO resultadoQuiz (fkUsuario, terror, roguelike, acao, historia, fps, rpg, puzzle, ritmo, foco)
        VALUES (${idUsuario}, ${terror}, ${roguelike}, ${acao}, ${historia}, ${fps}, ${rpg}, ${puzzle}, ${ritmo}, ${foco})
        ON DUPLICATE KEY UPDATE
            terror = ${terror},
            roguelike = ${roguelike},
            acao = ${acao},
            historia = ${historia},
            fps = ${fps},
            rpg = ${rpg},
            puzzle = ${puzzle},
            ritmo = ${ritmo},
            foco = ${foco},
            dataResultado = CURRENT_TIMESTAMP;
    `;

    console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorUsuario(idUsuario) {
    console.log('ACESSEI O QUIZ MODEL - buscarPorUsuario', idUsuario);
    var instrucaoSql = `SELECT * FROM resultadoQuiz WHERE fkUsuario = ${idUsuario};`;
    console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    salvarOuAtualizar,
    buscarPorUsuario
};
