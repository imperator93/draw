namespace Server.Models;

public record WsDto<T>(
    string Type,
    T Data
);