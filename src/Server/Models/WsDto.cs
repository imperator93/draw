namespace Server.Models;

public record Positions(
    bool MousePressed,
    int X,
    int Y
);
public record WsDto(
    string ConnectionId,
    Positions Positions
);