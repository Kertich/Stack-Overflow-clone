CREATE PROCEDURE GetAnswerComments
    @AnswerId INT
AS
BEGIN
    SELECT *
    FROM Comment
    WHERE AnswerId = @AnswerId;
END


EXEC GetAnswerComments @AnswerId = 123;
