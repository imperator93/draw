namespace Server.Models;

public record MessageDto(
    string From,
    string To,
    string Message
);