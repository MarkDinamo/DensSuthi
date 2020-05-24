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
            return await _pizzaAndSushiContext.ProductTypes.OrderBy(e => e.Priority).ToListAsync();
        }

        public async Task Update(ProductType productType)
        {
            var entity = await _pizzaAndSushiContext.ProductTypes.FirstOrDefaultAsync(e => e.Id == productType.Id);
            entity.Name = productType.Name;
            entity.Priority = productType.Priority;
            await _pizzaAndSushiContext.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var entity = await _pizzaAndSushiContext.ProductTypes.FirstOrDefaultAsync(e => e.Id == id);
            _pizzaAndSushiContext.ProductTypes.Remove(entity);
            await _pizzaAndSushiContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<ProductType>> GetWithProducts()
        {
            var productTypes = await _pizzaAndSushiContext.ProductTypes.OrderBy(e => e.Priority).AsNoTracking().ToListAsync();
            foreach (var productType in productTypes)
            {
                productType.Products = await _pizzaAndSushiContext.Products.Where(e => e.ProductTypeId == productType.Id && e.IsHidden == false).ToListAsync();
            }

            return productTypes.Where(e=> e.Products.Any());
        }
    }
}
