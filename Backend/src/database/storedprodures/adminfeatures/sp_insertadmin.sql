CREATE PROCEDURE InsertAdmin
    @Username NVARCHAR(50),
    @Password NVARCHAR(50)
AS
BEGIN
    INSERT INTO Admin (Username, Password)
    VALUES (@Username, @Password);
END


EXEC InsertAdmin 'adminuser', 'adminpassword';
