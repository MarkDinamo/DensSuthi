using Microsoft.AspNetCore.Http;
using PizzaAndSushi.Services.Abstractions;
using System.IO;
using System.Threading.Tasks;

namespace PizzaAndSushi.Services.Implementation
{
    public class FileService : IFileService
    {
        private readonly string _folderPath = @"C:\Users\klasf\Desktop\test";
        private readonly string _type = ".jpg";
        public async Task<Stream> Get(string id)
        {
            var fileName = GetFileName(id);
            if (File.Exists(fileName))
            {
                var stream = File.OpenRead(fileName);
                return stream;
            }

            return File.OpenRead(@"C:\Users\klasf\Desktop\test\noImage.jpg");
      
        }

        public async Task Create(IFormFile file, string id)
        {
            var fileName = GetFileName(id);
            var isExit = File.Exists(fileName);
            if (isExit)
            {
                await Delete(id);
            }

            using (var stream = File.Create(fileName))
            {
                await file.CopyToAsync(stream);
            }
        }

        public async Task Delete(string id)
        {
            var fileName = GetFileName(id);
            File.Delete(fileName);
        }

        private string GetFileName(string id)
        {
            var path = Path.Combine(_folderPath, id);
            return string.Format($"{path}{_type}");
        }
    }
}
