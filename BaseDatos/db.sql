DROP DATABASE IF EXISTS tickets;
CREATE DATABASE IF NOT EXISTS tickets;
USE tickets;

CREATE TABLE `clients` (
  `id` int PRIMARY KEY,
  `dni` varchar(150) UNIQUE NOT NULL,
  `type_dni` typesofdni NOT NULL DEFAULT "Cedula",
  `name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(10),
  `state` boolean
);

CREATE TABLE `bus` (`
  `id` int PRIMARY KEY,
  `plate` varchar(7) UNIQUE NOT NULL,
  `unit_number` varchar(10) UNIQUE NOT NULL,
  `capacity` int NOT NULL,
  `id_driver` int NOT NULL,
  `id_member` int NOT NULL,
  `state` boolean
);

CREATE TABLE `drivers` (
  `id` int PRIMARY KEY,
  `license` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `type_license` ENUM ('D', 'E') NOT NULL,
  `state` boolean
);

CREATE TABLE `times_buses` (
  `id` int PRIMARY KEY,
  `hour_start` date NOT NULL,
  `hour_finalize` date,
  `id_bus` int NOT NULL,
  `id_root` int NOT NULL
);

CREATE TABLE `reserves` (
  `id` int PRIMARY KEY,
  `dateStart` date NOT NULL,
  `num_child` int NOT NULL,
  `num_adult` int NOT NULL,
  `id_time` int NOT NULL,
  `id_client` int NOT NULL,
  `state` boolean
);

CREATE TABLE `tickets` (
  `id` int PRIMARY KEY,
  `id_reserve` int NOT NULL,
  `exit_plataform` int NOT NULL,
  `subTotal` float NOT NULL,
  `discount` float NOT NULL DEFAULT 0,
  `total` float NOT NULL,
  `state` boolean
);

CREATE TABLE `ecommends` (
  `id` int PRIMARY KEY,
  `guide_number` varchar(150) UNIQUE NOT NULL,
  `date_entry` date NOT NULL,
  `date_retirement` date,
  `id_sender` int NOT NULL,
  `id_recipient` int NOT NULL,
  `origin` varchar(150) NOT NULL,
  `destiny` varchar(150) NOT NULL,
  `sub_total` float NOT NULL DEFAULT 0,
  `total` float NOT NULL DEFAULT 0,
  `status` ENUM ('Ingresada', 'Despachada', 'En camino', 'Desembarque', 'Entregada', 'Perdida', 'Olvidada', 'Anulada') NOT NULL DEFAULT "Ingresada",
  `id_bus` int NOT NULL,
  `state` boolean
);

CREATE TABLE `packs` (
  `id` int PRIMARY KEY,
  `description` varchar(150) NOT NULL,
  `quantity` int NOT NULL,
  `weight` int NOT NULL,
  `type` typeproducts NOT NULL,
  `price` float NOT NULL,
  `id_ecommends` int NOT NULL,
  `state` boolean
);

CREATE TABLE `terminals` (
  `id` int PRIMARY KEY,
  `name` varchar(150) NOT NULL,
  `type_termianl` ENUM ('terrestre', 'matriz', 'sucursal', 'oficina') NOT NULL,
  `city` varchar(150) NOT NULL,
  `address` varchar(150) NOT NULL,
  `status` boolean
);

CREATE TABLE `roots` (
  `id` int PRIMARY KEY,
  `code` varchar(150) UNIQUE NOT NULL,
  `origin` int NOT NULL,
  `destiny` int NOT NULL,
  `price_complete` float NOT NULL,
  `price_special` float NOT NULL,
  `state` boolean
);

CREATE TABLE `users` (
  `id` int PRIMARY KEY,
  `dni` varchar(150) UNIQUE NOT NULL,
  `typeDni` typesOfDni NOT NULL DEFAULT "CÃ©dula",
  `name` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(10),
  `photo` varchar(255) NOT NULL,
  `status` boolean NOT NULL DEFAULT true,
  `idRole` int NOT NULL
);

CREATE TABLE `rols` (
  `id` int PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `type_rol` ENUM ('principal', 'subRol') NOT NULL,
  `status` boolean NOT NULL DEFAULT true
);

CREATE TABLE `permissions` (
  `id` int PRIMARY KEY,
  `permission` varchar(100) NOT NULL
);

CREATE TABLE `role_permission` (
  `id` int PRIMARY KEY,
  `idRole` int NOT NULL,
  `idPermission` int NOT NULL
);

CREATE TABLE `cooperatives_resprestant` (
  `id` int PRIMARY KEY,
  `dni` varchar(150) UNIQUE NOT NULL,
  `typeDni` typesOfDni NOT NULL DEFAULT "CÃ©dula",
  `name` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` boolean NOT NULL DEFAULT true
);

CREATE TABLE `cooperatives` (
  `id` int PRIMARY KEY,
  `ruc` int(13) NOT NULL DEFAULT "CÃ©dula",
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(250) NOT NULL,
  `phone` varchar(255) UNIQUE NOT NULL,
  `id_cooperative_represent` int NOT NULL,
  `status` boolean NOT NULL DEFAULT true
);

CREATE TABLE `members` (
  `id` int PRIMARY KEY,
  `dni` varchar(150) UNIQUE NOT NULL,
  `typeDni` typesOfDni NOT NULL DEFAULT "CÃ©dula",
  `name` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(250) NOT NULL,
  `phone` varchar(255) UNIQUE NOT NULL,
  `id_cooperative` int NOT NULL,
  `status` boolean NOT NULL DEFAULT true
);

ALTER TABLE `bus` ADD FOREIGN KEY (`id_driver`) REFERENCES `drivers` (`id`);

ALTER TABLE `bus` ADD FOREIGN KEY (`id_member`) REFERENCES `members` (`id`);

ALTER TABLE `times_buses` ADD FOREIGN KEY (`id_bus`) REFERENCES `bus` (`id`);

ALTER TABLE `times_buses` ADD FOREIGN KEY (`id_root`) REFERENCES `roots` (`id`);

ALTER TABLE `reserves` ADD FOREIGN KEY (`id_time`) REFERENCES `times_buses` (`id`);

ALTER TABLE `reserves` ADD FOREIGN KEY (`id_client`) REFERENCES `clients` (`id`);

ALTER TABLE `tickets` ADD FOREIGN KEY (`id_reserve`) REFERENCES `reserves` (`id`);

ALTER TABLE `ecommends` ADD FOREIGN KEY (`id_sender`) REFERENCES `clients` (`id`);

ALTER TABLE `ecommends` ADD FOREIGN KEY (`id_recipient`) REFERENCES `clients` (`id`);

ALTER TABLE `ecommends` ADD FOREIGN KEY (`id_bus`) REFERENCES `bus` (`id`);

ALTER TABLE `packs` ADD FOREIGN KEY (`id_ecommends`) REFERENCES `ecommends` (`id`);

ALTER TABLE `roots` ADD FOREIGN KEY (`origin`) REFERENCES `terminals` (`id`);

ALTER TABLE `roots` ADD FOREIGN KEY (`destiny`) REFERENCES `terminals` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`idRole`) REFERENCES `rols` (`id`);

ALTER TABLE `role_permission` ADD FOREIGN KEY (`idRole`) REFERENCES `rols` (`id`);

ALTER TABLE `role_permission` ADD FOREIGN KEY (`idPermission`) REFERENCES `permissions` (`id`);

ALTER TABLE `cooperatives` ADD FOREIGN KEY (`id_cooperative_represent`) REFERENCES `cooperatives_resprestant` (`id`);

ALTER TABLE `members` ADD FOREIGN KEY (`id_cooperative`) REFERENCES `cooperatives` (`id`);
