using Microsoft.AspNetCore.WebSockets;
using Server.Middleware;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddWebSockets(o =>
    {
        o.KeepAliveInterval = TimeSpan.FromMinutes(2);
    });
}

var app = builder.Build();
{
    app.UseWebSockets();
    app.UseMiddleware<WebsocketServer>();
    app.Run();
}