using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var conexao = builder.Configuration.GetConnectionString("conexao");

if (conexao == null)
{
    Console.WriteLine("Erro! valor nulo da string");
    return;
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(conexao, ServerVersion.AutoDetect(conexao)));

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors();

app.MapControllers();

app.Run();

[ApiController]
[Route("Api/[controller]")]
public class MusicasController : ControllerBase
{
    private readonly AppDbContext _context;
    public MusicasController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> ObterPorId(int id)
    {
        var musica = await _context.Musica.FindAsync(id);

        if (musica == null)
        {
            return NotFound(new { mensagem = "Musica não encontrada!" });
        }

        return Ok(musica);
    }

}

[ApiController]

[Route("Api/[controller]")]

public class UsuariosController : ControllerBase
{

    private readonly AppDbContext _context;

    public UsuariosController(AppDbContext context)
    {
        _context = context;
    }
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] string dadoLogin)
    {

        var usuario = await _context.Usuarios
            .FirstOrDefaultAsync(usuario => usuario.Nome == dadoLogin);

        if (usuario == null)
        {
            return NotFound(new { mensagem = "Usuario não existente!" });
        }

        return Ok(new { message = "Sucesso!" });

    }

    [HttpPost("cadastro")]

    public async Task<IActionResult> CriarConta([FromBody] Usuario dadoCadastro)
    {

        if (dadoCadastro == null || string.IsNullOrEmpty(dadoCadastro.Nome))
        {
            return BadRequest("O nome do usuario é obrigatório");
        }
        var verificacao = await _context.Usuarios
        .FirstOrDefaultAsync(u => u.Nome == dadoCadastro.Nome);

        if (verificacao != null)
        {
            return BadRequest("Este nome de usuario já está cadastrado!");
        }

        _context.Usuarios.Add(dadoCadastro);

        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById),  new { id = dadoCadastro.Id }, dadoCadastro);


    }

    [HttpGet("{id}")]

    public async Task<IActionResult> GetById(int id)
    {
        var usuario = await _context.Usuarios.FindAsync(id);

        if(usuario == null)
        {
            return NotFound();
        }

        return Ok(usuario); 

    }
}



