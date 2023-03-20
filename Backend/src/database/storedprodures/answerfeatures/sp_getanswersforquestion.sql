CREATE PROCEDURE GetAnswersForQuestion
    @QuestionId INT
AS
BEGIN
    SELECT * FROM Answer
    WHERE QuestionId = @QuestionId;
END


EXEC GetAnswersForQuestion @QuestionId = 123;
