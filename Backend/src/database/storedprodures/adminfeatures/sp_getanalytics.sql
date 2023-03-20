CREATE PROCEDURE GetAnalytics
AS
BEGIN
    SELECT
        (SELECT COUNT(*) FROM [User]) AS NumUsers,
        (SELECT COUNT(*) FROM Question) AS NumQuestions,
        (SELECT COUNT(*) FROM Answer) AS NumAnswers;
END


EXEC GetAnalytics;
