using PizzaAndSushi.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PizzaAndSushi.Services.Abstractions
{
    public interface IProductsService
    {
        Task<ScrollResult<Product>> GetProductsAsync(int skip, int take);
        Task<Product> GetProduct(int id);
        Task AddProduct(Product product);
        Task UpdateProduct(Product product);
        Task RemoveProduct(int id);
    }
}
