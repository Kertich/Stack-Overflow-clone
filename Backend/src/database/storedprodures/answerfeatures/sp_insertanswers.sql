CREATE PROCEDURE InsertAnswer
    @QuestionId INT,
    @UserId INT,
    @AnswerText NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO Answer (QuestionId, UserId, AnswerText, PostedOn)
    VALUES (@QuestionId, @UserId, @AnswerText, GETDATE());
END



EXEC InsertAnswer @QuestionId = 1, @UserId = 123, @AnswerText = 'This is my answer.'
