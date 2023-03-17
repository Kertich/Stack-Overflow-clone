CREATE TABLE question_views (
  id INT PRIMARY KEY,
  question_id INT,
  user_id INT,
  created_at DATETIME,
  FOREIGN KEY (question_id) REFERENCES questions(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);