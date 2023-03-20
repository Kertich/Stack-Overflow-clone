CREATE PROCEDURE sp_InsertQuestion
    @UserId INT,
    @Title NVARCHAR(100),
    @Body NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Question (UserId, Title, Body, CreatedAt)
    VALUES (@UserId, @Title, @Body, GETDATE());
END



EXEC sp_InsertQuestion 1, 'How do I create a stored procedure?', 'I am new to SQL and would like to know how to create a stored procedure. Can someone help me?';
