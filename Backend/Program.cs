using Backend.Data;
using Backend.Mapping;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// dodati swagger
builder.Services.AddSwaggerGen();

// dodavanje db contexta
builder.Services.AddDbContext<NatjecanjaContext>(o =>
{
    o.UseSqlServer(builder.Configuration.GetConnectionString("NogometnaNatjecanjaContext"));
});

// Svi se mogu od svakud spojiti na na� API
builder.Services.AddCors(o => {
    o.AddPolicy("CorsPolicy", b => { 
        b.AllowAnyOrigin();   // ovo mo�e i�i i b.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        b.AllowAnyMethod();
        b.AllowAnyHeader();
    });
});

// automapper
builder.Services.AddAutoMapper(typeof(EdunovaMappingProfile));

var app = builder.Build();

// Configure the HTTP request pipeline.

app.MapOpenApi();


app.UseHttpsRedirection();

app.UseAuthorization();

// swagger sucelje
app.UseSwagger();
app.UseSwaggerUI(o =>
{
    o.EnableTryItOutByDefault();
    o.ConfigObject.AdditionalItems.Add("requestSnippetsEnabled", true);
});

app.MapControllers();

app.UseCors("CorsPolicy");

//za potrebe produkcije
app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");

app.Run();
