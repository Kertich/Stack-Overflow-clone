CREATE PROCEDURE UpdateAnswer
    @AnswerId INT,
    @AnswerText NVARCHAR(MAX)
AS
BEGIN
    UPDATE Answer
    SET AnswerText = @AnswerText
    WHERE AnswerId = @AnswerId;
END


EXEC UpdateAnswer @AnswerId = 1, @AnswerText = 'This is the updated answer text.'


