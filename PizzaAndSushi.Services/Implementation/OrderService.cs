using Microsoft.EntityFrameworkCore;
using PizzaAndSushi.DB;
using PizzaAndSushi.Models;
using PizzaAndSushi.Services.Abstractions;
using PizzaAndSushi.Services.UiModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaAndSushi.Services.Implementation
{
    public class OrderService : IOrderService
    {
        private readonly PizzaAndSushiContext _pizzaAndSushiContext;
        private static Random random = new Random();

        public OrderService(PizzaAndSushiContext pizzaAndSushiContext)
        {
            _pizzaAndSushiContext = pizzaAndSushiContext;
        }
        public async Task<string> Create(CreateOrderModel createOrderModel)
        {
            createOrderModel.OrderDetails.CreatedOne = DateTime.Now;
            createOrderModel.OrderDetails.OrderStatusId = 1;
            createOrderModel.OrderDetails.Code = random.Next(10000, 99999);

            using (var transaction = await _pizzaAndSushiContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var order = await _pizzaAndSushiContext.AddAsync(createOrderModel.OrderDetails);
                    await _pizzaAndSushiContext.SaveChangesAsync();

                    var oderItems = createOrderModel.Products.Select(e => new OrderItem()
                    {
                        ProductId = e.Key,
                        Count = e.Value,
                        OrderId = order.Entity.Id

                    });

                    await _pizzaAndSushiContext.OrderItems.AddRangeAsync(oderItems);
                    await _pizzaAndSushiContext.SaveChangesAsync();

                    await transaction.CommitAsync();

                    return $"{order.Entity.Id}-{createOrderModel.OrderDetails.Code}";
                }
                catch (Exception e)
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }

        public async Task<IEnumerable<Order>> Get()
        {
            return await _pizzaAndSushiContext.Orders.Include(o => o.OrderStatus).OrderByDescending(e => e.CreatedOne).ToListAsync();
        }

        public async Task<IEnumerable<OrderItem>> GetOrderItems(string orderId)
        {
            throw new NotImplementedException();
        }

        public Task Update(Order order)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<OrderStatus>> GetStatuses()
        {
            return await _pizzaAndSushiContext.OrderStatuses.ToListAsync();
        }

        public async Task UpdateStatus(int id, int statusId)
        {
            var order = await _pizzaAndSushiContext.Orders.FirstAsync(e => e.Id == id);
            order.OrderStatusId = statusId;
            await _pizzaAndSushiContext.SaveChangesAsync();
        }
    }
}
