create database saveRoom;

use saveRoom;

create user 'user_saveRoomVM'@'%' identified by 'Urubu@100';

grant insert, select, update on saveRoom.* to 'user_saveRoomVM'@'%';

grant update on saveRoom.* to 'user_saveRoomVM'@'%';



create table usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nickname VARCHAR(45),
cpf CHAR(11)
);

create table infoUsuarios (
idInfo INT AUTO_INCREMENT,
fkUsuario INT,
constraint fkInfoUsuario foreign key (fkUsuario)
	references usuario(idUsuario),
email VARCHAR(45) not null,
constraint chkEmail CHECK(email like '%_@_%.com'),
senha VARCHAR(45) not null,
primary key (idInfo, fkUsuario)
);

create table diarioJogos (
idDiario INT AUTO_INCREMENT,
fkUsuario INT,
jogo VARCHAR(45) not null,
registro TEXT not null,
dataRegistro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY(idDiario, fkUsuario),
FOREIGN KEY(fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE resultadoQuiz (
    idResultadoQuiz INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT UNIQUE,
    terror INT,
    roguelike INT,
    acao INT,
    historia INT,
    fps INT,
    rpg INT,
    puzzle INT,
    ritmo INT,
    foco INT,
    dataResultado DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);
        

-- selec dos registros por usuario
SELECT u.nickname, d.jogo, d.registro, d.dataRegistro
FROM diarioJogos d
JOIN usuario u ON u.idUsuario = d.fkUsuario
WHERE u.idUsuario = 1
ORDER BY d.dataRegistro DESC;    

-- ultima tentativa do quiz por usuario

SELECT u.nickname, r.terror, r.roguelike, r.acao, r.historia,
       r.fps, r.rpg, r.puzzle, r.ritmo, r.foco, r.dataResultado
FROM resultadoQuiz r
JOIN usuario u ON u.idUsuario = r.fkUsuario
WHERE u.idUsuario = 1;

-- quantidade de registros de cada usuario

SELECT u.nickname, COUNT(d.idDiario) AS totalRegistros
FROM usuario u
LEFT JOIN diarioJogos d ON d.fkUsuario = u.idUsuario
GROUP BY u.idUsuario, u.nickname
ORDER BY totalRegistros DESC;