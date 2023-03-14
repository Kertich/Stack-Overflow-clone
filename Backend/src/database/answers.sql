CREATE TABLE answers (
  id INT PRIMARY KEY,
  user_id INT,
  question_id INT,
  content TEXT,
  created_at DATETIME,
  updated_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (question_id) REFERENCES questions(id)
);