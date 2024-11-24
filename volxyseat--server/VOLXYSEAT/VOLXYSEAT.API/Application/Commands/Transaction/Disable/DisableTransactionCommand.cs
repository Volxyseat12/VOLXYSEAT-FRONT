using MediatR;

namespace VOLXYSEAT.API.Application.Commands.Transaction.Disable;

public record DisableTransactionCommand(Guid ClientId) : IRequest<bool>;
