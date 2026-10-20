using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;

public class Musicas
{
    public int Id { get; set; }

    public string caminho { get; set; } = string.Empty;

}

public class Usuario
{

    public int Id { get; set; }

    public string Nome { get; set; } = string.Empty;
}

public class AppDbContext : DbContext
{

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Musicas> Musica => Set<Musicas>();

    public DbSet<Usuario> Usuarios => Set<Usuario>();
}