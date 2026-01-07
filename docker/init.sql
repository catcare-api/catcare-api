CREATE TABLE IF NOT EXISTS tutors (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  telefone VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS cats (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  raca VARCHAR(50), 
  idade INT,
  tutor_id INT REFERENCES tutors(id)
);

CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  cat_id INT REFERENCES cats(id) ON DELETE CASCADE,
  data_consulta TIMESTAMP NOT NULL,
  descricao TEXT,
  status VARCHAR(20) DEFAULT 'agendado' -- ex: agendado, concluído, cancelado
);