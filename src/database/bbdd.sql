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

create table usuario(
	id_usuario int primary key auto_increment not null,
    nombre varchar(50) not null,
    correo varchar(50) not null,
    password varchar(50) not null,
    permisos boolean not null
)

