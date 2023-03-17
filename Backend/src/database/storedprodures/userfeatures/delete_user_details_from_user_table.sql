CREATE PROCEDURE sp_DeleteUser
    @userId INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM users
    WHERE userId = @userId;
END


EXEC sp_DeleteUser 1;



