using Microsoft.EntityFrameworkCore;
using PizzaAndSushi.DB;
using PizzaAndSushi.Models;
using PizzaAndSushi.Services.Abstractions;
using System.Linq;
using System.Threading.Tasks;

namespace PizzaAndSushi.Services.Implementation
{
    public class ProductsService : IProductsService
    {
        private readonly PizzaAndSushiContext _pizzaAndSushiContext;

        public ProductsService(PizzaAndSushiContext pizzaAndSushiContext)
        {
            _pizzaAndSushiContext = pizzaAndSushiContext;
        }
        public async Task AddProduct(Product product)
        {
            await _pizzaAndSushiContext.AddAsync(product);
            await _pizzaAndSushiContext.SaveChangesAsync();
        }

        public async Task<Product> GetProduct(int id)
        {
            return await _pizzaAndSushiContext.Products.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<ScrollResult<Product>> GetProductAsync(int skip, int take, int productTypeId)
        {
            var items = await _pizzaAndSushiContext.Products.AsNoTracking()
                                                      .Where(e => e.ProductTypeId == productTypeId)
                                                      .OrderBy(e => e.Id)
                                                      .Skip(skip)
                                                      .Take(take)
                                                      .ToListAsync();

            var count = await _pizzaAndSushiContext.Products.CountAsync();

            return new ScrollResult<Product>
            {
                Count = count,
                Items = items
            };
        }

        public async Task<ScrollResult<Product>> GetProductsAsync(int skip, int take)
        {
            var items = await _pizzaAndSushiContext.Products
                                                    .AsNoTracking()
                                                    .OrderBy(e => e.Id)
                                                    .Skip(skip)
                                                    .Take(take)
                                                    .ToListAsync();

            var count = await _pizzaAndSushiContext.Products.CountAsync();

            return new ScrollResult<Product>
            {
                Count = count,
                Items = items
            };
        }

        public async Task RemoveProduct(int id)
        {
            var entity = await _pizzaAndSushiContext.Products.FirstOrDefaultAsync(e => e.Id == id);
            _pizzaAndSushiContext.Products.Remove(entity);
            await _pizzaAndSushiContext.SaveChangesAsync();
        }

        public async Task UpdateProduct(Product product)
        {
            var entity = await _pizzaAndSushiContext.Products.FirstOrDefaultAsync(e => e.Id == product.Id);

            entity.IsHidden = product.IsHidden;
            entity.IsLiquid = product.IsLiquid;
            entity.Name = product.Name;
            entity.Price = product.Price;
            entity.Weight = product.Weight;
            entity.Details = product.Details;
            entity.ProductType = product.ProductType;
            entity.ProductTypeId = product.ProductTypeId;

            await _pizzaAndSushiContext.SaveChangesAsync();
        }
    }
}
