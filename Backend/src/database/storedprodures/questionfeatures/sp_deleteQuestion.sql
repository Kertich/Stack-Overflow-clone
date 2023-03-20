CREATE PROCEDURE sp_DeleteQuestion
    @QuestionId INT
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Delete associated answers
    DELETE FROM Answer
    WHERE QuestionId = @QuestionId;
    
    -- Delete question
    DELETE FROM Question
    WHERE QuestionId = @QuestionId;
END



EXEC sp_DeleteQuestion 1;
