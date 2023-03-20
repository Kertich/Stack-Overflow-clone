CREATE PROCEDURE GetQuestionAndAnswers
    @QuestionId INT
AS
BEGIN
    SELECT *
    FROM Question
    WHERE Id = @QuestionId;

    SELECT *
    FROM Answer
    WHERE QuestionId = @QuestionId;
END


EXEC GetQuestionAndAnswers @QuestionId = 123;
