using static ChatApp.Data.Pg;
using System.Text.Json;
using ChatApp;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();


var app = builder.Build();

app.MapControllers();

connectionString = ""; //JsonSerializer.Deserialize<Dictionary<string, string>>(File.ReadAllText("config.json"))?["connectionString"];

//app.UseMiddleware<AuthMiddleware>();
app.Run();
