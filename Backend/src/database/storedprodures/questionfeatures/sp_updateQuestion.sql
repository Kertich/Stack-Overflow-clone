CREATE PROCEDURE sp_UpdateQuestion
    @QuestionId INT,
    @Title NVARCHAR(100),
    @Body NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Question
    SET Title = @Title, Body = @Body
    WHERE QuestionId = @QuestionId;
END


EXEC sp_UpdateQuestion 1, 'How do I create a stored procedure in SQL Server?', 'I am new to SQL Server and would like to know how to create a stored procedure. Can someone provide me with a step-by-step guide?';
