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
    telefono varchar(50) not null,
    password varchar(50) not null,
    fecha_nac date not null,
    permisos boolean not null
);

drop table producto;
select * from producto;

insert into producto(nombre, descripcion, imagen, precio, categoria) values ('Concha', '', 'https://corporativo.esperanza.mx/filemanager/9d548bfb-9fc0-4e1e-959c-dab756f43b1e.jpg', 11, '');
insert into producto(nombre, descripcion, imagen, precio, categoria) values ('Pay de queso', '', 'https://corporativo.esperanza.mx/filemanager/fd317586-dff7-4fc7-bf4c-596e428641c1.jpg', 28, '');
insert into producto(nombre, descripcion, imagen, precio, categoria) values ('Muffin', '', 'https://corporativo.esperanza.mx/filemanager/eeb179d5-e45f-431c-916f-aa40ae1d240f.jpg', 18, '');
insert into producto(nombre, descripcion, imagen, precio, categoria) values ('Bigote', '', 'https://corporativo.esperanza.mx/filemanager/d16d1929-08bf-48c0-9a05-a987d4e07241.jpg', 11, '');

