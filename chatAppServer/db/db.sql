
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS Usuarios (
    Id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
);
ALTER TABLE Usuarios ADD COLUMN IF NOT EXISTS NomeUsuario VARCHAR(32);
ALTER TABLE Usuarios ADD COLUMN IF NOT EXISTS Email VARCHAR(256);
ALTER TABLE Usuarios ADD COLUMN IF NOT EXISTS Senha VARCHAR(128);


ALTER TABLE Usuarios DROP CONSTRAINT IF EXISTS NomeUsuario;
ALTER TABLE Usuarios ADD CONSTRAINT NomeUsuario UNIQUE (NomeUsuario);

CREATE TABLE IF NOT EXISTS Livros (
    Id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
);
ALTER TABLE Livros ADD COLUMN IF NOT EXISTS DataInsert TIMESTAMP DEFAULT NOW();
ALTER TABLE Livros ADD COLUMN IF NOT EXISTS ISBN VARCHAR(20);
ALTER TABLE Livros ADD COLUMN IF NOT EXISTS Titulo VARCHAR(255);
ALTER TABLE Livros ADD COLUMN IF NOT EXISTS QuantidadePaginas INTEGER DEFAULT 0;
ALTER TABLE Livros ADD COLUMN IF NOT EXISTS AnoPublicacao INTEGER DEFAULT 0;
ALTER TABLE Livros ADD COLUMN IF NOT EXISTS Descricao TEXT;
ALTER TABLE Livros ADD COLUMN IF NOT EXISTS Categorias VARCHAR(255)[];
ALTER TABLE Livros ADD COLUMN IF NOT EXISTS Autores VARCHAR(255)[];
ALTER TABLE Livros ADD COLUMN IF NOT EXISTS Imagens JSONB;

CREATE TABLE IF NOT EXISTS UsuariosLivros (
    Id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
);
ALTER TABLE UsuariosLivros ADD COLUMN IF NOT EXISTS IdLivro UUID DEFAULT NULL;
ALTER TABLE UsuariosLivros ADD COLUMN IF NOT EXISTS IdUsuario UUID DEFAULT NULL;
ALTER TABLE UsuariosLivros ADD COLUMN IF NOT EXISTS DataInsert TIMESTAMP DEFAULT NOW();
ALTER TABLE UsuariosLivros ADD COLUMN IF NOT EXISTS PaginasLidas INTEGER DEFAULT 0;

ALTER TABLE usuarioslivros DROP CONSTRAINT IF EXISTS usuarioslivros_unique;
ALTER TABLE usuarioslivros ADD CONSTRAINT usuarioslivros_unique UNIQUE (idlivro,idusuario);

CREATE TABLE IF NOT EXISTS Comentarios (
    Id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
);
ALTER TABLE Comentarios ADD COLUMN IF NOT EXISTS IdLivro UUID DEFAULT NULL;
ALTER TABLE Comentarios ADD COLUMN IF NOT EXISTS IdUsuario UUID DEFAULT NULL;
ALTER TABLE Comentarios ADD COLUMN IF NOT EXISTS DataInsert TIMESTAMP DEFAULT NOW();
ALTER TABLE Comentarios ADD COLUMN IF NOT EXISTS Comentario text DEFAULT NULL;