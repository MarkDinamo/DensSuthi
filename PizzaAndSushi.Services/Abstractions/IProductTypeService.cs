using PizzaAndSushi.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PizzaAndSushi.Services.Abstractions
{
    public interface IProductTypeService
    {
        Task<IEnumerable<ProductType>> GetAsync();
        Task AddAsync(ProductType productType);
        Task Update(ProductType productType);
        Task Delete(int id);
        Task<IEnumerable<ProductType>> GetWithProducts();
    }
}
