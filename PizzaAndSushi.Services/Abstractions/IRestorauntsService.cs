using PizzaAndSushi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PizzaAndSushi.Services.Abstractions
{
    public interface IRestorauntsService  
    {
        Task<IEnumerable<Restaurants>> GetRestaurants();
        Task CreatOrUpdate(Restaurants restaurants);
        Task Delete(int id);
    }
}
