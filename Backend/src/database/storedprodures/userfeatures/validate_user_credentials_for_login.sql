CREATE PROCEDURE sp_ValidateUserCredentials
    @Email VARCHAR(100),
    @Password VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @UserId INT;
    SELECT @UserId = UserId FROM users WHERE Email = @Email AND Password = @Password;
    SELECT @UserId AS 'UserId';
END
