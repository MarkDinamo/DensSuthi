using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzaAndSushi.Models;
using PizzaAndSushi.Services.Abstractions;

namespace PizzaAndSushi.WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductTypeController : ControllerBase
    {
        private IProductTypeService _productTypeService;

        public ProductTypeController(IProductTypeService productTypeService)
        {
            _productTypeService = productTypeService;
        }

        [HttpGet]
        public async Task<IEnumerable<ProductType>> Get()
        {
            return await _productTypeService.GetAsync();
        }

        [HttpPost]
        public async Task Add([FromBody] ProductType productType)
        {
            await _productTypeService.AddAsync(productType);
        }

        [HttpDelete]
        [Route("{id:int:min(0)}")]
        public async Task Delete(int id)
        {
            await _productTypeService.Delete(id);
        }

        [HttpPut]
        public async Task Update([FromBody] ProductType productType)
        {
            await _productTypeService.Update(productType);
        }
    }
}