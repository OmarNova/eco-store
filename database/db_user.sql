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
  `passwd` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecostore`.`pedidos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS pedidos;
CREATE TABLE IF NOT EXISTS `ecostore`.`pedidos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `total` DOUBLE NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  INDEX `fk_pedidos_users_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_pedidos_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `ecostore`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecostore`.`productos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS productos;
CREATE TABLE IF NOT EXISTS `ecostore`.`productos` (
  `idproductos` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idproductos`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecostore`.`pedidos_has_productos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS pedidos_has_productos;
CREATE TABLE IF NOT EXISTS `ecostore`.`pedidos_has_productos` (
  `pedidos_id` INT NOT NULL,
  `pedidos_users_id` INT NOT NULL,
  `productos_idproductos` VARCHAR(45) NOT NULL,
  `cantidad` INT,
  PRIMARY KEY (`pedidos_id`, `pedidos_users_id`, `productos_idproductos`),
  INDEX `fk_pedidos_has_productos_productos1_idx` (`productos_idproductos` ASC) VISIBLE,
  INDEX `fk_pedidos_has_productos_pedidos1_idx` (`pedidos_id` ASC, `pedidos_users_id` ASC) VISIBLE,
  CONSTRAINT `fk_pedidos_has_productos_pedidos1`
    FOREIGN KEY (`pedidos_id` , `pedidos_users_id`)
    REFERENCES `ecostore`.`pedidos` (`id` , `users_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedidos_has_productos_productos1`
    FOREIGN KEY (`productos_idproductos`)
    REFERENCES `ecostore`.`productos` (`idproductos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecostore`.`productos_has_users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS productos_has_users;
CREATE TABLE IF NOT EXISTS `ecostore`.`productos_has_users` (
  `productos_idproductos` VARCHAR(45) NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`productos_idproductos`, `users_id`),
  INDEX `fk_productos_has_users_users1_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_productos_has_users_productos1_idx` (`productos_idproductos` ASC) VISIBLE,
  CONSTRAINT `fk_productos_has_users_productos1`
    FOREIGN KEY (`productos_idproductos`)
    REFERENCES `ecostore`.`productos` (`idproductos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_productos_has_users_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `ecostore`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

