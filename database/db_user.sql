
-- -----------------------------------------------------
DROP DATABASE IF EXISTS ecostore;
CREATE SCHEMA IF NOT EXISTS `ecostore` DEFAULT CHARACTER SET utf8 ;
USE `ecostore` ;

-- -----------------------------------------------------
-- Table `ecostore`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecostore`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombres` VARCHAR(45) NOT NULL,
  `apellidos` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `passwd` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecostore`.`perdidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecostore`.`perdidos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `total` DOUBLE NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  INDEX `fk_perdidos_users_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_perdidos_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `ecostore`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecostore`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecostore`.`products` (
  `idproducts` INT NOT NULL,
  `id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idproducts`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecostore`.`favorito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecostore`.`favorito` (
  `idfavorito` INT NOT NULL AUTO_INCREMENT,
  `idProduct` VARCHAR(45) NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`idfavorito`, `users_id`),
  INDEX `fk_favorito_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_favorito_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `ecostore`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecostore`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecostore`.`productos` (
  `idproductos` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `precio` INT NULL,
  PRIMARY KEY (`idproductos`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecostore`.`perdidos_has_productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecostore`.`perdidos_has_productos` (
  `perdidos_id` INT NOT NULL,
  `perdidos_users_id` INT NOT NULL,
  `productos_idproductos` INT NOT NULL,
  PRIMARY KEY (`perdidos_id`, `perdidos_users_id`, `productos_idproductos`),
  INDEX `fk_perdidos_has_productos_productos1_idx` (`productos_idproductos` ASC) VISIBLE,
  INDEX `fk_perdidos_has_productos_perdidos1_idx` (`perdidos_id` ASC, `perdidos_users_id` ASC) VISIBLE,
  CONSTRAINT `fk_perdidos_has_productos_perdidos1`
    FOREIGN KEY (`perdidos_id` , `perdidos_users_id`)
    REFERENCES `ecostore`.`perdidos` (`id` , `users_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_perdidos_has_productos_productos1`
    FOREIGN KEY (`productos_idproductos`)
    REFERENCES `ecostore`.`productos` (`idproductos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecostore`.`productos_has_favorito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecostore`.`productos_has_favorito` (
  `productos_idproductos` INT NOT NULL,
  `favorito_idfavorito` INT NOT NULL,
  `favorito_users_id` INT NOT NULL,
  PRIMARY KEY (`productos_idproductos`, `favorito_idfavorito`, `favorito_users_id`),
  INDEX `fk_productos_has_favorito_favorito1_idx` (`favorito_idfavorito` ASC, `favorito_users_id` ASC) VISIBLE,
  INDEX `fk_productos_has_favorito_productos1_idx` (`productos_idproductos` ASC) VISIBLE,
  CONSTRAINT `fk_productos_has_favorito_productos1`
    FOREIGN KEY (`productos_idproductos`)
    REFERENCES `ecostore`.`productos` (`idproductos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_productos_has_favorito_favorito1`
    FOREIGN KEY (`favorito_idfavorito` , `favorito_users_id`)
    REFERENCES `ecostore`.`favorito` (`idfavorito` , `users_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

