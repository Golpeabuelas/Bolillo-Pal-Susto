create database bolillo;

use bolillo;

create table producto(
	id_producto int primary key auto_increment not null,
    nombre varchar(50) not null,
    descripcion text not null,
    imagen varchar(255) not null,
    precio decimal(5,2) not null,
    categoria varchar(255) not null
);

drop table producto;

