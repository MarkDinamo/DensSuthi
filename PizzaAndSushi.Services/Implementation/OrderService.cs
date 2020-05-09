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

        public OrderService(PizzaAndSushiContext pizzaAndSushiContext)
        {
            _pizzaAndSushiContext = pizzaAndSushiContext;
        }
        public async Task<string> Create(CreateOrderModel createOrderModel)
        {
            createOrderModel.OrderDetails.CreatedOne = DateTime.Now;
            createOrderModel.OrderDetails.OrderStatusId = 1;

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

                    return "72831";
                }
                catch (Exception e) 
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }

        public Task<IEnumerable<Order>> Get()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<OrderItem>> GetOrderItems(string orderId)
        {
            throw new NotImplementedException();
        }

        public Task Update(Order order)
        {
            throw new NotImplementedException();
        }
    }
}
