namespace Server.Models;

public record Positions(
    int X,
    int Y
);

public record MoveModel(
    bool MousePressed,
    Positions Positions
);