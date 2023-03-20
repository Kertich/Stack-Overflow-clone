CREATE PROCEDURE GetAllQuestions
AS
BEGIN
    SELECT * FROM Question;
END


EXEC GetAllQuestions;
