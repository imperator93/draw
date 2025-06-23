namespace Server.Models;

public record WsDto<T>(
    string Type,
    string ConnectionId,
    T Positions,
    T Message
);