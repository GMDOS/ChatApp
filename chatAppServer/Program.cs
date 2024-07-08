using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

// Configuração para WebSockets
var webSocketOptions = new WebSocketOptions
{
    KeepAliveInterval = TimeSpan.FromMinutes(2)
};

app.UseWebSockets(webSocketOptions);

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();

app.Use(async (context, next) =>
{
    if (context.WebSockets.IsWebSocketRequest)
    {
        using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
        
        // Função callback para tratar a mensagem recebida
        void HandleMessage(string message)
        {
            // Lógica para processar a mensagem recebida
            Console.WriteLine($"Mensagem recebida: {message}");
            // Aqui você pode adicionar sua lógica para processar a mensagem recebida
        }

        // Chama a função de escuta passando o WebSocket e o callback
        await ListenWebSocket(webSocket, HandleMessage);
        
        // Exemplo de envio de mensagem
        string messageToSend = "Olá, WebSocket!";
        await SendWebSocketMessage(webSocket, messageToSend);
    }
    else
    {
        await next();
    }
});

// Função para escutar mensagens no WebSocket
static async Task ListenWebSocket(WebSocket webSocket, Action<string> callback)
{
    var buffer = new byte[1024 * 4];
    WebSocketReceiveResult receiveResult;

    do
    {
        receiveResult = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
        receiveResult.CloseStatus
WebSocketCloseStatus.

        if (receiveResult.MessageType == WebSocketMessageType.Text)
        {
            string message = Encoding.UTF8.GetString(buffer, 0, receiveResult.Count);
            callback(message); // Chama o callback com a mensagem recebida
        }

    } while (!receiveResult.CloseStatus.HasValue);

    await webSocket.CloseAsync(receiveResult.CloseStatus.Value, receiveResult.CloseStatusDescription, CancellationToken.None);
}

// Função para enviar mensagem pelo WebSocket
static async Task SendWebSocketMessage(WebSocket webSocket, string message)
{
    byte[] buffer = Encoding.UTF8.GetBytes(message);
    await webSocket.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);
}

app.Run();
