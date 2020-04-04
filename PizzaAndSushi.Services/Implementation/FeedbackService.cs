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
    public class FeedbackService : IFeedbackService
    {
        private PizzaAndSushiContext _pizzaAndSushiContext;

        public FeedbackService(PizzaAndSushiContext pizzaAndSushiContext)
        {
            _pizzaAndSushiContext = pizzaAndSushiContext;
        }
        public async Task AddAsync(Feedback feedback)
        {
            await _pizzaAndSushiContext.Feedbacks.AddAsync(feedback);
            await _pizzaAndSushiContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _pizzaAndSushiContext.Feedbacks.FirstOrDefaultAsync();
            if (entity != null)
            {
                _pizzaAndSushiContext.Feedbacks.Remove(entity);
                await _pizzaAndSushiContext.SaveChangesAsync();
            }
        }

        public async Task DeleteManyAsync(IEnumerable<int> ids)
        {
            var entities = await _pizzaAndSushiContext.Feedbacks.Where(e => ids.Any(i => i == e.Id)).ToListAsync();
            if (entities.Any())
            {
                _pizzaAndSushiContext.Feedbacks.RemoveRange(entities);
                await _pizzaAndSushiContext.SaveChangesAsync();
            }
        }

        public async Task<ScrollResult<Feedback>> GetAsync(int skip, int take)
        {
            var entities = await _pizzaAndSushiContext.Feedbacks.OrderByDescending(e => e.CreatedOn)
                                                          .Skip(skip)
                                                          .Take(take)
                                                          .ToListAsync();

            var count = await _pizzaAndSushiContext.Feedbacks.CountAsync();

            return new ScrollResult<Feedback>
            {
                Count = count,
                Items = entities
            };
        }

        public async Task<Feedback> GetAsync(int id)
        {
            return await _pizzaAndSushiContext.Feedbacks.FirstOrDefaultAsync(e => e.Id == id);
        }
    }
}
