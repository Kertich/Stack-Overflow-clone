CREATE PROCEDURE sp_ResetPassword
    @Email NVARCHAR(100),
    @NewPassword NVARCHAR(50),
    @VerificationCode NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    -- Check if email and verification code match
    IF EXISTS (SELECT * FROM User WHERE Email = @Email AND VerificationCode = @VerificationCode)
    BEGIN
        -- Reset password
        UPDATE User
        SET Password = HASHBYTES('SHA2_512', @NewPassword)
        WHERE Email = @Email;
    END
END


EXEC sp_ResetPassword 'user@example.com', 'newpassword', '123456';
