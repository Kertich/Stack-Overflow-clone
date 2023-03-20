CREATE PROCEDURE sp_checkEmailExists
  @email VARCHAR(255)
AS
BEGIN
  SET NOCOUNT ON;

  IF EXISTS (SELECT 1 FROM users WHERE email = @email)
    SELECT 1 AS emailExists;
  ELSE
    SELECT 0 AS emailExists;
END
