CREATE PROCEDURE MarkAsPreferredAnswer
    @QuestionId INT,
    @AnswerId INT
AS
BEGIN
    UPDATE Answer
    SET IsPreferredAnswer = 1
    WHERE QuestionId = @QuestionId AND AnswerId = @AnswerId;
END


EXEC MarkAsPreferredAnswer @QuestionId = 123, @AnswerId = 456;


