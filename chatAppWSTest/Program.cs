using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        ClientWebSocket clientWebSocket = new ClientWebSocket();
        Uri serverUri = new Uri("ws://localhost:5000");

        try
        {
            await clientWebSocket.ConnectAsync(serverUri, CancellationToken.None);

            Console.WriteLine("Conectado ao servidor WebSocket.");

            while (true)
            {
                Console.Write("Digite uma mensagem para enviar (ou 'exit' para sair): ");
                string message = Console.ReadLine();

                if (message.ToLower() == "exit")
                    break;

                await SendWebSocketMessage(clientWebSocket, message);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erro ao conectar ou enviar mensagem: {ex.Message}");
        }
        finally
        {
            if (clientWebSocket.State == WebSocketState.Open)
                await clientWebSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Fechando conexão", CancellationToken.None);

            clientWebSocket.Dispose();
        }
    }

    static async Task SendWebSocketMessage(ClientWebSocket clientWebSocket, string message)
    {
        byte[] buffer = Encoding.UTF8.GetBytes(message);
        await clientWebSocket.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);
    }
}
