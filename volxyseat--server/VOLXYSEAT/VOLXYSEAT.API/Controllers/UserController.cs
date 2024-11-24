using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;
using VOLXYSEAT.API.Application.Commands.Account.Login;
using VOLXYSEAT.API.Application.Commands.Account.Logout;
using VOLXYSEAT.API.Application.Commands.Account.Register;
using VOLXYSEAT.API.Application.Responses;

namespace VOLXYSEAT.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IMediator _mediator;

        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("register")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> Post([FromBody] RegisterUserCommand request)
        {
            var result = await _mediator.Send(request);
            return result ? Ok() : BadRequest();
        }

        [HttpPost("login")]
        [ProducesResponseType(typeof(LoginUserResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> Login([FromBody] LoginUserCommand request)
        {
            var result = await _mediator.Send(request);
            return result != null ? Ok(result) : BadRequest();
        }


        [Authorize]
        [HttpPost("logout")]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        public async Task<IActionResult> Logout()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var result = await _mediator.Send(new LogoutCommand(Guid.Parse(userId)));

            if(result)
                return Ok("Logout successful.");

            return BadRequest("Failed to logout.");
        }
    }
}
