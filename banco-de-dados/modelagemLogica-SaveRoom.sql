create database saveRoom;

use saveRoom;

create user 'user_saveRoom'@'localhost' identified by 'Urubu@100';

-- create user 'user_saveRoom'@'%' identified by 'Urubu@300'; -- comando deve ser copiado na VM
grant insert, select on savemRoom.* to 'user_saveRoom'@'localhost';