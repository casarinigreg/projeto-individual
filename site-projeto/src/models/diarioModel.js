var database = require("../database/config");

function listarPorUsuario(idUsuario) {
    console.log("ACESSEI O DIARIO MODEL \n\n function listarPorUsuario(): ", idUsuario);
    var instrucaoSql = `
        SELECT idDiario, fkUsuario, jogo, registro, dataRegistro
        FROM diarioJogos
        WHERE fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function publicar(jogo, registro, idUsuario) {
    console.log("ACESSEI O DIARIO MODEL \n\n function publicar(): ", jogo, registro, idUsuario);
    var instrucaoSql = `
        INSERT INTO diarioJogos (fkUsuario, jogo, registro)
        VALUES (${idUsuario}, '${jogo}', '${registro}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(novoRegistro, idDiario, idUsuario) {
    console.log("ACESSEI O DIARIO MODEL \n\n function editar(): ", novoRegistro, idDiario, idUsuario);
    var instrucaoSql = `
        UPDATE diarioJogos
        SET registro = '${novoRegistro}', dataRegistro = CURRENT_TIMESTAMP
        WHERE idDiario = ${idDiario} AND fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarPorUsuario,
    publicar,
    editar
};
