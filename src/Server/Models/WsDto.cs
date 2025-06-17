namespace Server.Models;

public record Positions(
    bool MousePressed,
    int X,
    int Y
);
public record WsDto(
    string Type,
    string ConnectionId,
    Positions Positions
);