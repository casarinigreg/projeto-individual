var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT u.idUsuario, u.nickname, i.senha, i.fkUsuario FROM usuario u 
        JOIN infoUsuarios i ON u.idUsuario = i.fkUsuario
        WHERE i.email = '${email}' AND i.senha = '${senha}';
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
async function cadastrar(nome, email, senha, cpf) {
    console.log("ACESSEI O USUARIO MODEL \n\n function cadastrar():", nome, email, senha, cpf);

    var sqlCliente = `
        INSERT INTO usuario (nickname, cpf)
        VALUES ('${nome}', '${cpf}');
    `;
    var resultadoCliente = await database.executar(sqlCliente);
    var idCliente = resultadoCliente.insertId;
    
    var sqlUsuario = `
        INSERT INTO infoUsuarios (email, senha, fkUsuario)
        VALUES ('${email}', '${senha}', ${idCliente});
    `;
    return database.executar(sqlUsuario);
}

module.exports = {
    autenticar,
    cadastrar
};