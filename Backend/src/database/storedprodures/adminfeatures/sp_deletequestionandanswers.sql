CREATE PROCEDURE DeleteQuestionAndAnswers
    @QuestionId INT
AS
BEGIN
    -- Delete all associated answers
    DELETE FROM Answer WHERE QuestionId = @QuestionId;

    -- Delete the question
    DELETE FROM Question WHERE QuestionId = @QuestionId;
END


EXEC DeleteQuestionAndAnswers @QuestionId = 12345;
