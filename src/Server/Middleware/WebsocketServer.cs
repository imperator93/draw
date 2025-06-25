using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using Server.Models;

namespace Server.Middleware;

public class WebsocketServer
{
    private readonly RequestDelegate _next;
    private readonly WebsocketConnectionManager _manager;
    public WebsocketServer(RequestDelegate next, WebsocketConnectionManager manager)
    {
        _manager = manager;
        _next = next;
    }
    public async Task InvokeAsync(HttpContext context)
    {
        var ws = await context.WebSockets.AcceptWebSocketAsync();
        string conId = _manager.AddSocket(ws);

        if (context.WebSockets.IsWebSocketRequest)
        {
            while (ws.State == WebSocketState.Open)
            {
                byte[] buffer = new byte[128];

                var result = await ws.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

                if (result.MessageType == WebSocketMessageType.Close)
                {
                    await ws.CloseAsync(WebSocketCloseStatus.NormalClosure, "connection closed", CancellationToken.None);
                    return;
                }

                await BroadcastMessages(buffer);
            }
        }

        else await _next(context);
    }
    private async Task BroadcastMessages(byte[] buffer)
    {
        foreach (var s in _manager.GetSockets())
        {
            await s.Value.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);
        }
    }
}