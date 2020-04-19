using PizzaAndSushi.Services.Abstractions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace PizzaAndSushi.Services.Implementation
{
    public class FileService : IFileService
    {
        public async Task<Stream> Get(int id)
        {
            var stream  =File.OpenRead($@"C:\Users\klasf\Desktop\pizzahut_szynka-1000x1000px.jpg");
            return stream;
        }
    }
}
