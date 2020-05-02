﻿using PizzaAndSushi.Models;
using PizzaAndSushi.Services.UiModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PizzaAndSushi.Services.Abstractions
{
    public interface IOrderService
    {
        Task Create(CreateOrderModel createOrderModel);
        Task Update(Order order);
        Task<IEnumerable<Order>> Get();
        Task<IEnumerable<OrderItem>> GetOrderItems(string orderId);
    }
}