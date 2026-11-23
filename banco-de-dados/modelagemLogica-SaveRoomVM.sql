create database saveRoom;

use saveRoom;

create user 'user_saveRoomVM'@'%' identified by 'Urubu@100';

-- create user 'user_saveRoomVM'@'%' identified by 'Urubu@300'; -- comando deve ser copiado na VM
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

-- select dos registros em diário para visualização no site

SELECT idDiario, fkUsuario, jogo, registro, dataRegistro
        FROM diarioJogos
        WHERE fkUsuario = 1;
        
        
truncate diarioJogos;

