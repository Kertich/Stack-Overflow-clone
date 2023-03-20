CREATE PROCEDURE DeleteAnswer
    @AnswerId INT
AS
BEGIN
    DELETE FROM Answer
    WHERE AnswerId = @AnswerId;
END


EXEC DeleteAnswer @AnswerId = 123;
