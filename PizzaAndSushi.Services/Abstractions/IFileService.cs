using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace PizzaAndSushi.Services.Abstractions
{
   public interface IFileService
    {
        Task<Stream> Get(int id);
    }
}
