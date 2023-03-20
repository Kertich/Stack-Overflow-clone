CREATE PROCEDURE ValidateAdminCredentials
    @Username NVARCHAR(50),
    @Password NVARCHAR(50)
AS
BEGIN
    IF EXISTS (SELECT * FROM Admin WHERE Username = @Username AND Password = @Password)
    BEGIN
        SELECT 1 AS IsValid;
    END
    ELSE
    BEGIN
        SELECT 0 AS IsValid;
    END
END


EXEC ValidateAdminCredentials 'your_admin_username', 'your_admin_password';
