using System.Collections.Concurrent;
using System.Net.WebSockets;

namespace Server.Middleware;

public class WebsocketConnectionManager
{
    private readonly ConcurrentDictionary<string, WebSocket> _sockets = [];

    public ConcurrentDictionary<string, WebSocket> GetSockets()
    {
        return _sockets;
    }

    public string AddSocket(WebSocket socket)
    {
        string connId = Guid.NewGuid().ToString();
        _sockets.TryAdd(connId, socket);
        System.Console.WriteLine($"Connection added: {connId}");
        return connId;
    }

}