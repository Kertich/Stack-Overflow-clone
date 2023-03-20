CREATE PROCEDURE GetUserQuestionsWithMostAnswers
    @UserId INT
AS
BEGIN
    SELECT TOP 10 Q.*, COUNT(A.AnswerId) AS AnswerCount
    FROM Question Q
    LEFT JOIN Answer A ON Q.QuestionId = A.QuestionId
    WHERE Q.UserId = @UserId
    GROUP BY Q.QuestionId, Q.UserId, Q.Title, Q.Description, Q.PostedOn
    ORDER BY COUNT(A.AnswerId) DESC;
END


EXEC GetUserQuestionsWithMostAnswers @UserId = 123;
