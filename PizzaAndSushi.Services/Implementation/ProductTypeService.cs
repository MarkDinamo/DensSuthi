using Microsoft.EntityFrameworkCore;
using PizzaAndSushi.DB;
using PizzaAndSushi.Models;
using PizzaAndSushi.Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaAndSushi.Services.Implementation
{
    public class ProductTypeService : IProductTypeService
    {
        private readonly PizzaAndSushiContext _pizzaAndSushiContext;

        public ProductTypeService(PizzaAndSushiContext pizzaAndSushiContext)
        {
            _pizzaAndSushiContext = pizzaAndSushiContext;
        }

        public async Task AddAsync(ProductType productType)
        {
            await _pizzaAndSushiContext.ProductTypes.AddAsync(productType);
            await _pizzaAndSushiContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<ProductType>> GetAsync()
        {
            return await _pizzaAndSushiContext.ProductTypes.ToListAsync();
        }
    }
}
