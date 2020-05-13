using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using PizzaAndSushi.Models;
using PizzaAndSushi.Services.Abstractions;
using PizzaAndSushi.Services.UiModels;

namespace PizzaAndSushi.WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        [Route("create")]
        public async Task<string> Create([FromBody] CreateOrderModel createOrderModel)
        {
            return await _orderService.Create(createOrderModel);
        }

        [HttpGet]
        [Route("all")]
        public async Task<IEnumerable<Order>> All()
        {
            return await _orderService.Get();
        }

        [HttpGet]
        [Route("GetOrderItemsById/{id}")]
        public async Task<IEnumerable<KeyValuePair<string,int>>> GetOrderItems(int id)
        {
            return await _orderService.GetOrderItems(id);
        }

        [HttpGet]
        [Route("statuses")]
        public async Task<IEnumerable<OrderStatus>> Statuses()
        {
            return await _orderService.GetStatuses();
        }

        [HttpGet]
        [Route("updateOrderStatus/{id}/{statusId}")]
        public async Task UpdateOrderStatus(int id, int statusId)
        {
            await _orderService.UpdateStatus(id, statusId);
        }

        [HttpGet]
        [Route("getOrderByCode/{id}/{code}")]
        public async Task<Order> OrderByCode(int id, int code)
        {
          return  await _orderService.GetByCode(id, code);
        }
    }
}