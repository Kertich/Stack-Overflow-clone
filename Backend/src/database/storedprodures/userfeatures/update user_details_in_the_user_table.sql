CREATE PROCEDURE sp_UpdateUser
    @UserId INT,
    @FirstName VARCHAR(50),
    @LastName VARCHAR(50),
    @Email VARCHAR(100),
    @Password VARCHAR(100),
    @ProfileImage VARBINARY(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE user
    SET FirstName = @FirstName,
        LastName = @LastName,
        Email = @Email,
        Password = @Password,
        ProfileImage = @ProfileImage
    WHERE UserId = @UserId;
END




EXEC sp_UpdateUser 1, 'John', 'Doe', 'johndoe@email.com', 'newpassword', NULL;

