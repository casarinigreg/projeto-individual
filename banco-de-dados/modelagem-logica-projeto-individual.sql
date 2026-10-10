create database ProjetoIndividual;

use ProjetoIndividual;

-- Crir usuário de inserção da database
create user 'jogador_insert'@'localhost' identified by 'games0309';

-- Dar permissão de inserção para o usuário criado
grant insert on ProjetoIndividual.* to 'jogador_insert'@'localhost';

-- Salvar alterações de permissão
flush privileges;

-- Verificar as permissões
show grants for 'jogador_insert'@'localhost';