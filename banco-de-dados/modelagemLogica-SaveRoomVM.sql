create database saveRoom;

use saveRoom;

create user 'user_saveRoomVM'@'localhost' identified by 'Urubu@100';

-- create user 'user_saveRoom'@'%' identified by 'Urubu@300'; -- comando deve ser copiado na VM
grant insert, select on savemRoom.* to 'user_saveRoom'@'localhost';

create table usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nickname VARCHAR(45),
email VARCHAR(45) not null,
constraint chkEmail CHECK(email like '%_@_%.com'),
senha VARCHAR(45) not null
);
