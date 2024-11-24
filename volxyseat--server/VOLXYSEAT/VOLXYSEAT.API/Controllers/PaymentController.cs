
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using VOLXYSEAT.API.Application.Commands.MercadoPago.CancelPreApproval;
using VOLXYSEAT.API.Application.Commands.MercadoPago.CreatePreApproval;
using VOLXYSEAT.API.Application.Commands.MercadoPago.CreatePreApprovalPlan;


namespace VOLXYSEAT.API.Controllers;

[Authorize]
[ApiController]
[Route("api/v1/[controller]")]
public class Payment(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;

    [HttpPost("create-preapproval-plan")]
    public async Task<IActionResult> CreatePreApprovalPlan(CreatePreApprovalPlanCommand command)
    {
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpPost("create-preapproval")]
    public async Task<IActionResult> CreatePreApproval([FromBody] CreatePreApprovalCommand command)
    {
        var result = await _mediator.Send(command);

        if (result == null) return BadRequest();

        return Ok(result);
    }

    [HttpPut("cancel-preapproval/{id}")]
    public async Task<IActionResult> CancelPreApproval(string id)
    {
        var command = new CancelPreApprovalCommand(id);
        var result = await _mediator.Send(command);

        if (result == null) return BadRequest();

        return Ok(result);
    }
}

