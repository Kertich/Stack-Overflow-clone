CREATE TABLE questions (
  id INT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  content TEXT,
  created_at DATETIME,
  updated_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id)
);