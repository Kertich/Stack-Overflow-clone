CREATE PROCEDURE sp_SendPasswordResetEmail
    @Email NVARCHAR(100),
    @ResetLink NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    -- Check if email exists in the User table
    IF EXISTS (SELECT * FROM users WHERE Email = @Email)
    BEGIN
        -- Send password reset email with reset link
        EXEC msdb.dbo.sp_send_dbmail
            @profile_name = 'YourEmailProfile',
            @recipients = @Email,
            @subject = 'Password Reset Request',
            @body = 'Please click the following link to reset your password: ' + @ResetLink;
    END
END



EXEC sp_SendPasswordResetEmail 'user@example.com', 'https://example.com/resetpassword';
