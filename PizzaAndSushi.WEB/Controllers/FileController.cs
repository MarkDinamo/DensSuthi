using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzaAndSushi.Services.Abstractions;

namespace PizzaAndSushi.WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IFileService _fileService;

        public FileController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetFile(int id)
        {
            var stream = await _fileService.Get(id.ToString());
            return File(stream, "application/octet-stream");
        }

        [HttpPost]
        [Route("create/{id}")]
        public async Task Create(string id, IFormFile file)
        {
            await _fileService.Create(file, id);
        }
    }
}