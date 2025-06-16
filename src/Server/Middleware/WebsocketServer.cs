using System.Data;
using System.Net.WebSockets;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Localization;
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
                byte[] buffer = new byte[64];

                var result = await ws.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                if (result.MessageType == WebSocketMessageType.Close)
                {
                    await ws.CloseAsync(WebSocketCloseStatus.NormalClosure, "connection closed", CancellationToken.None);
                    return;
                }

                await HandleSendMessage(buffer, ws);
            }
        }

        else await _next(context);
    }

    private async Task HandleSendMessage(byte[] buffer, WebSocket socket)
    {
        string recievedMessage = Encoding.UTF8.GetString(buffer);

        recievedMessage.TrimEnd();
        var message = JsonSerializer.Deserialize<WsDto>(recievedMessage);

        byte[] sendBuffer = new byte[64];

        foreach (var s in _manager.GetSockets())
        {
            if (s.Key == message!.ConnectionId)
            {
                sendBuffer = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(message));
            }
        }
        await socket.SendAsync(sendBuffer, WebSocketMessageType.Text, true, CancellationToken.None);
    }
}