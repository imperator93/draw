using System.Text;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.WebSockets;
using Server.Middleware;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddWebSockets(o =>
    {
        o.KeepAliveInterval = TimeSpan.FromMinutes(2);
    });

    builder.Services.AddSingleton<WebsocketConnectionManager>();

    builder.Services.AddCors(o =>
    {
        o.AddDefaultPolicy(p =>
        {
            p.AllowAnyHeader();
            p.AllowAnyMethod();
            p.AllowAnyOrigin();
        });
    });
}

var app = builder.Build();
{
    app.UseWebSockets();
    app.UseMiddleware<WebsocketServer>();
    app.UseCors();
    app.Use(async (context, next) =>
    {
        await context.Response.Body.WriteAsync(Encoding.UTF8.GetBytes("hello from http middleware"));
        await next();
    });
    app.Run();
}