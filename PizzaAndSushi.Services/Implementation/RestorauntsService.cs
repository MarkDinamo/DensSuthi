using Microsoft.EntityFrameworkCore;
using PizzaAndSushi.DB;
using PizzaAndSushi.Models;
using PizzaAndSushi.Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PizzaAndSushi.Services.Implementation
{
    public class RestorauntsService : IRestorauntsService
    {
        private PizzaAndSushiContext _pizzaAndSushiContext;

        public RestorauntsService(PizzaAndSushiContext pizzaAndSushiContext)
        {
            _pizzaAndSushiContext = pizzaAndSushiContext;
        }
        public async Task CreatOrUpdate(Restaurants restaurants)
        {
            if (restaurants.Id == 0)
            {
                await _pizzaAndSushiContext.AddAsync(restaurants);
                await _pizzaAndSushiContext.SaveChangesAsync();
            }
        }

        public async  Task Delete(int id)
        {
            var entity = await _pizzaAndSushiContext.Restaurants.FirstOrDefaultAsync(e => e.Id == id);
            if (entity != null)
            {
                _pizzaAndSushiContext.Restaurants.Remove(entity);
                await _pizzaAndSushiContext.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Restaurants>> GetRestaurants()
        {
            return await _pizzaAndSushiContext.Restaurants.ToListAsync();
        }
    }
}
