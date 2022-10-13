using API.Data;
using API.Extensions;
using API.IdentityData;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                      });
});

ConfigurationManager config = builder.Configuration;
IWebHostEnvironment env = builder.Environment;

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer("Data Source=.;Database=Raya;Trusted_Connection=True"));
builder.Services.AddDbContext<AppIdentityDbContext>(options => options.UseSqlServer("Data Source=.;Database=RayaUsers;Trusted_Connection=True"));
builder.Services.AddScoped<IHrRepository,HrRepository>();
builder.Services.AddScoped<ITokenService,TokenService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddIdentityServices(config);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
