using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;

namespace PizzaAndSushi.Services.Abstractions
{
    public interface IFileService
    {
        Task<Stream> Get(string id);
        Task Create(IFormFile file, string id);
        Task Delete(string id);
    }
}
