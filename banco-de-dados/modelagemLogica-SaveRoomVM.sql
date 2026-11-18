create database saveRoom;

use saveRoom;

create user 'user_saveRoomVM'@'localhost' identified by 'Urubu@100';

-- create user 'user_saveRoom'@'%' identified by 'Urubu@300'; -- comando deve ser copiado na VM
grant insert, select on savemRoom.* to 'user_saveRoom'@'localhost';

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
dataRegistro DATE not null,
PRIMARY KEY(idDiario, fkUsuario),
FOREIGN KEY(fkUsuario) REFERENCES usuario(idUsuario)
);