CREATE PROCEDURE DeleteUser
    @UserId INT
AS
BEGIN
    -- Delete the user's answers
    DELETE FROM Answer WHERE UserId = @UserId;

    -- Delete the user's comments
    DELETE FROM Comment WHERE UserId = @UserId;

    -- Delete the user's votes
    DELETE FROM Vote WHERE UserId = @UserId;

    -- Delete the user
    DELETE FROM [User] WHERE UserId = @UserId;
END


EXEC DeleteUser @UserId = 1234;
