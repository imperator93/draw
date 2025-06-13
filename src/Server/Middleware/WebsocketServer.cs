using System.Net.WebSockets;

namespace Server.Middleware;

public class WebsocketServer
{
    private readonly RequestDelegate _next;
    public WebsocketServer(RequestDelegate next) => _next = next;
    public async Task InvokeAsync(HttpContext context)
    {
        if (context.WebSockets.IsWebSocketRequest)
        {
            var ws = await context.WebSockets.AcceptWebSocketAsync();
            while (ws.State == WebSocketState.Open)
            {
                byte[] buffer = new byte[64];

                var result = await ws.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                if (result.MessageType == WebSocketMessageType.Close)
                {
                    await ws.CloseAsync(WebSocketCloseStatus.NormalClosure, "connection closed", CancellationToken.None);
                    return;
                }
                await ws.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);
            }
        }

        else await _next(context);
    }
}