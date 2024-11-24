using MediatR;
using VOLXYSEAT.API.Application.Models.Responses;

namespace VOLXYSEAT.API.Application.Commands.MercadoPago.CreatePreApproval;

public record CreatePreApprovalCommand(
    string PreApprovalPlanId,
    string Reason,
    string Email,
    string CardTokenId,
    decimal Amount,
    int BillingDay) : IRequest<PreApprovalResponse>;

