using PizzaAndSushi.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PizzaAndSushi.Services.Abstractions
{
    public interface IFeedbackService
    {
        Task AddAsync(Feedback feedback);
        Task<ScrollResult<Feedback>> GetAsync(int skip, int take);
        Task<Feedback> GetAsync(int id);
        Task DeleteAsync(int id);
        Task DeleteManyAsync(IEnumerable<int> ids);
    }
}
