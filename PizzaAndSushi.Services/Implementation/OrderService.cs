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
        public async Task Create(CreateOrderModel createOrderModel)
        {
            createOrderModel.OrderDetails.CreatedOne = DateTime.Now;

            using (var transaction = await _pizzaAndSushiContext.Database.BeginTransactionAsync())
            {
                var order = await _pizzaAndSushiContext.AddAsync(createOrderModel.OrderDetails);
                var oderItems = createOrderModel.Products.Select(e => new OrderItem()
                {
                    ProductId = e.Key,

                });
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
