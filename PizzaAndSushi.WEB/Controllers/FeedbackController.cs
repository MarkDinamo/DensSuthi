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
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;

        public FeedbackController(IFeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        [HttpGet]
        [Route("get/{skip:int:min(0)}/{take:int:range(0,20)}")]
        public async Task<ScrollResult<Feedback>> Get(int skip, int take)
        {
            return await _feedbackService.GetAsync(skip, take);
        }

        [HttpPost]
        [Route("add")]
        public async Task Add([FromBody] Feedback feedback)
        {
            await _feedbackService.AddAsync(feedback);
        }
    }
}