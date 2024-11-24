using MediatR;
using VOLXYSEAT.API.Application.Models.Responses;

namespace VOLXYSEAT.API.Application.Commands.MercadoPago.CancelPreApproval;

public record CancelPreApprovalCommand(string Id) : IRequest<PreApprovalResponse>;
