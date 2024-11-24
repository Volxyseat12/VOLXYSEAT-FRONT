using MediatR;
using VOLXYSEAT.API.Application.Models.Dtos.Transaction;

namespace VOLXYSEAT.API.Application.Commands.Transaction.Create;

public record CreateTransactionCommand(
    Guid ClientId, 
    Guid SubscriptionId, 
    string MercadoPagoSubscriptionId) : IRequest<TransactionDto>;
