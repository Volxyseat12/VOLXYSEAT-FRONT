using MediatR;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using VOLXYSEAT.API.Application.Request;
using Volxyseat.API.Application.Queries.Subscription;
using VOLXYSEAT.API.Application.Commands.Subscription.Close;
using VOLXYSEAT.API.Application.Commands.Subscription.Create;
using VOLXYSEAT.API.Application.Models.ViewModel.Subscription;
using Microsoft.AspNetCore.Authorization;
using VOLXYSEAT.API.Application.Commands.Subscription.Update;
using VOLXYSEAT.API.Application.Models.Requests.Subscription;

namespace VOLXYSEAT.API.Controllers
{
    [Authorize]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class SubscriptionController : Controller
    {
        private readonly IMediator _mediator;
        private readonly ILogger<SubscriptionController> _logger;

        public SubscriptionController(IMediator mediator, ILogger<SubscriptionController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(SubscriptionViewModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(SubscriptionViewModel), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get(Guid id)
        {
            var query = new GetSubscriptionQuery(id);
            var result = await _mediator.Send(query);

            if (result == null)
            {
                return NoContent();
            }

            return Ok(result);
        }


        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(typeof(SubscriptionViewModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        public async Task<IActionResult> GetAll()
        {
            var query = new GetAllSubscriptionQuery();
            var subscriptions = await _mediator.Send(query);

            if (subscriptions == null || !subscriptions.Any())
                return NoContent();

            return Ok(subscriptions);
        }

        [HttpPost("/new-subscription")]
        [ProducesResponseType(typeof(SubscriptionViewModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> Post([FromBody] SubscriptionRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var command = new CreateSubscriptionCommand(request);
            var result = await _mediator.Send(command);

            return result ? Ok() : BadRequest();
        }

        [HttpPut("{id:Guid}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> Update(Guid id,[FromBody] SubscriptionRequest request)
        {
            var command = new UpdateSubscriptionCommand(id, request);
            var result = await _mediator.Send(command);

            return result ? Ok() : BadRequest();
        }

        [HttpPost("{id:Guid}/states/action=close")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> Close(Guid id, [FromBody] SubscriptionChangeStatusWithCommentRequest request)
        {
            var command = new CloseSubscriptionCommand(id, request.Comment);
            var result = await _mediator.Send(command);

            if (!result)
                return BadRequest("Failed to close subscription.");

            return Ok();
        }
    }
}
