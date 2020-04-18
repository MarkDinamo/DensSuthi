using PizzaAndSushi.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace PizzaAndSushi.Services.UiModels
{
    public class CreateOrderModel
    {
        public Order OrderDetails { get; set; }
        public List<KeyValuePair<int, int>> Products { get; set; }
    }
}
