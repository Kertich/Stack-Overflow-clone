CREATE PROCEDURE VoteAnswer
    @AnswerId INT,
    @UserId INT,
    @VoteValue INT -- 1 for upvote, -1 for downvote
AS
BEGIN
    -- Check if the user has already voted on this answer
    IF EXISTS (SELECT * FROM Vote WHERE AnswerId = @AnswerId AND UserId = @UserId)
    BEGIN
        -- Update the existing vote
        UPDATE Vote SET VoteValue = @VoteValue WHERE AnswerId = @AnswerId AND UserId = @UserId;
    END
    ELSE
    BEGIN
        -- Insert a new vote
        INSERT INTO Vote (AnswerId, UserId, VoteValue) VALUES (@AnswerId, @UserId, @VoteValue);
    END
    
    -- Recalculate the answer score
    UPDATE Answer SET Score = (
        SELECT SUM(VoteValue) FROM Vote WHERE AnswerId = @AnswerId
    ) WHERE AnswerId = @AnswerId;
END


EXEC VoteAnswer @AnswerId = 123, @UserId = 456, @VoteValue = 1;
