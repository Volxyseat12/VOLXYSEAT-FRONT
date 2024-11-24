using MediatR;
using VOLXYSEAT.API.Application.Models.Responses;

namespace VOLXYSEAT.API.Application.Commands.MercadoPago.CreatePreApprovalPlan;

public record CreatePreApprovalPlanCommand(
    string Reason,
    decimal Amount) : IRequest<PreApprovalPlanResponse>;