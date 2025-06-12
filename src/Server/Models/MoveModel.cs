namespace Server.Models;

public record Positions(
    int x,
    int y
);

public record MoveModel(
    bool MousePressed,
    Positions positions
);