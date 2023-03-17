CREATE PROCEDURE sp_GetUserDetails
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT FirstName, LastName, Email, ProfileImage
    FROM users
    WHERE UserId = @UserId;
END


EXEC sp_GetUserDetails 1;
