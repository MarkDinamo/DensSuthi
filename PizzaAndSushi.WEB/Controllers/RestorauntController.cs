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
    public class RestorauntController : ControllerBase
    {
        private IRestorauntsService _restorauntsService;

        public RestorauntController(IRestorauntsService restorauntsService)
        {
            _restorauntsService = restorauntsService;
        }

        [HttpGet]
        public async Task<IEnumerable<Restaurants>> Get()
        {
            return await _restorauntsService.GetRestaurants();
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _restorauntsService.Delete(id);
        }

        [HttpPut]
        public async Task Put([FromBody]Restaurants restaurants)
        {
            await _restorauntsService.CreatOrUpdate(restaurants);
        }
    }
}