-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema BD_CONFEITARIA
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema BD_CONFEITARIA
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `BD_CONFEITARIA` DEFAULT CHARACTER SET utf8mb3 ;
USE `BD_CONFEITARIA` ;

-- -----------------------------------------------------
-- Table `BD_CONFEITARIA`.`Categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BD_CONFEITARIA`.`Categoria` (
  `idCategoria` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idCategoria`))
ENGINE = InnoDB
AUTO_INCREMENT = 0
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `BD_CONFEITARIA`.`Contato`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BD_CONFEITARIA`.`Contato` (
  `idContato` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NULL DEFAULT NULL,
  `Assunto` VARCHAR(45) NULL DEFAULT NULL,
  `Texto` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`idContato`))
ENGINE = InnoDB
AUTO_INCREMENT = 0
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `BD_CONFEITARIA`.`Produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BD_CONFEITARIA`.`Produto` (
  `idProduto` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NULL DEFAULT NULL,
  `Preco` DECIMAL(10,2) NULL DEFAULT NULL,
  `Descricao` VARCHAR(250) NULL DEFAULT NULL,
  `CategoriaID` INT NOT NULL,
  PRIMARY KEY (`idProduto`),
  INDEX `fk_Produto_Categoria1_idx` (`CategoriaID` ASC) VISIBLE,
  CONSTRAINT `fk_Produto_Categoria1`
    FOREIGN KEY (`CategoriaID`)
    REFERENCES `BD_CONFEITARIA`.`Categoria` (`idCategoria`))
ENGINE = InnoDB
AUTO_INCREMENT = 0
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `BD_CONFEITARIA`.`TipoUsuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BD_CONFEITARIA`.`TipoUsuario` (
  `idTipoUsuario` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idTipoUsuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 0
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `BD_CONFEITARIA`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BD_CONFEITARIA`.`Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NULL DEFAULT NULL,
  `Email` VARCHAR(45) NULL DEFAULT NULL,
  `Senha` VARCHAR(255) NULL DEFAULT NULL,
  `IdTipo` INT NOT NULL,
  PRIMARY KEY (`idUsuario`),
  INDEX `fk_User_TipoUser_idx` (`IdTipo` ASC) VISIBLE,
  CONSTRAINT `fk_User_TipoUser`
    FOREIGN KEY (`IdTipo`)
    REFERENCES `BD_CONFEITARIA`.`TipoUsuario` (`idTipoUsuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 0
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `BD_CONFEITARIA`.`Pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BD_CONFEITARIA`.`Pedidos` (
  `idPedidos` INT NOT NULL AUTO_INCREMENT,
  `ProdutoID` INT NOT NULL,
  `UsuarioID` INT NOT NULL,
  `Status` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idPedidos`, `ProdutoID`, `UsuarioID`),
  INDEX `fk_Pedidos_Produto1_idx` (`ProdutoID` ASC) VISIBLE,
  INDEX `fk_Pedidos_User1_idx` (`UsuarioID` ASC) VISIBLE,
  CONSTRAINT `fk_Pedidos_Produto1`
    FOREIGN KEY (`ProdutoID`)
    REFERENCES `BD_CONFEITARIA`.`Produto` (`idProduto`),
  CONSTRAINT `fk_Pedidos_User1`
    FOREIGN KEY (`UsuarioID`)
    REFERENCES `BD_CONFEITARIA`.`Usuario` (`idUsuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 0
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

USE BD_CONFEITARIA;

-- Populando a tabela Categoria
INSERT INTO Categoria (Nome) VALUES
('Bolos'),
('Doces');


-- Inserindo produtos da categoria 'Bolos'
INSERT INTO Produto (Nome, Preco, Descricao, CategoriaID) VALUES
('Bolo de Chocolate', 95.00, 'Bolo com massa de chocolate e recheio de mousse de ninho.', 1),
('Bolo de Abacaxi', 90.00, 'Bolo recheio de abacaxi com doce de leite.', 1),
('Bolo Kit Kat com confetes', 75.00, 'Bolo massa de chocolate com brigadeiro.', 1),
('Bolo de Abacaxi com coco', 100.00, 'Bolo com massa branca de abacaxi com coco.', 1),
('Bolo de Prestigio', 115.00, 'Bolo massa de chocolate com recheio de prestigio.', 1),
('Bolo de mousse de chocolate com morangos',125.00,'Bolo massa chocolate com Kit Kat e morangos.',1);


-- Inserindo produtos da categoria 'Doces'
INSERT INTO Produto (Nome, Preco, Descricao, CategoriaID) VALUES
('Brigadeiro Tradicional', 2.50, 'Docinho feito com leite condensado e chocolate.', 2),
('Beijinho', 2.50, 'Docinho de coco coberto com açúcar cristal.', 2),
('Brigadeiros Personalizados', 4.00, 'Docinho feito com leite condensado e chocolate.', 2),
('Pote da Felicidade', 7.50, 'Bis com surpresas.', 2),
('Pote da Felicidade', 7.50, 'Uva com surpresas.', 2);



insert tipousuario(Nome) values ("Cliente"),("Funcionario");

