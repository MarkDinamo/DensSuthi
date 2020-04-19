using System;
using System.Collections.Generic;
using System.Linq;
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
            var stream = await _fileService.Get(id);
            return File(stream, "application/octet-stream");
        }

        [HttpPost]
        [Route("create")]
        public async Task Create( IFormFile file)
        {
            var filePath = @"C:\Users\klasf\Desktop\test\1.jpg";

            try
            {
                using (var stream = System.IO.File.Create(filePath))
                {
                    await file.CopyToAsync(stream);
                }
            }
            catch (Exception e)
            {

                throw;
            }
        }
    }
}