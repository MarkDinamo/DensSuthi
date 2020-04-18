using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzaAndSushi.Models;
using PizzaAndSushi.Services.UiModels;

namespace PizzaAndSushi.WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        public OrderController()
        {

        }

        [HttpPost]
        [Route("create")]
        public async Task Create([FromBody] CreateOrderModel createOrderModel)
        {
            await Task.Delay(5000);
        }
    }
}