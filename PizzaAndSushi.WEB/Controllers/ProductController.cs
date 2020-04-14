using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.EntityFrameworkCore;
using PizzaAndSushi.DB;
using PizzaAndSushi.Models;
using PizzaAndSushi.Services.Abstractions;

namespace PizzaAndSushi.WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IProductsService _productsService;

        public ProductController(IProductsService productsService)
        {
            _productsService = productsService;
        }

        [HttpPut]
        [Route("getByIds")]
        public async Task<IEnumerable<Product>> Get([FromBody] IEnumerable<int> ids)
        {
           // var conver = args.Skip(1).Take(args.Length - 2);
            //var ids = string.Split(",").Select(e => Int32.Parse(e)).ToList();


            return await _productsService.GetProductByIds(ids);
        }

        [HttpGet]
        [Route("get/{skip:int:min(0)}/{take:int:range(0,100)}")]
        public async Task<ScrollResult<Product>> Get(int skip, int take)
        {
            return await _productsService.GetProductsAsync(skip, take);
        }

        [HttpGet]
        [Route("get/{id:int:min(0)}")]
        public async Task<ActionResult<Product>> Get(int id)
        {
            var product =  await _productsService.GetProduct(id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpPost]
        public async Task Add([FromBody]Product product)
        {
            await _productsService.AddProduct(product);
        }

        [HttpPut]
        public async Task Update([FromBody]Product product)
        {
            await _productsService.UpdateProduct(product);
        }

        [HttpDelete]
        public async Task Delete(int id)
        {
            await _productsService.RemoveProduct(id);
        }

    }
}