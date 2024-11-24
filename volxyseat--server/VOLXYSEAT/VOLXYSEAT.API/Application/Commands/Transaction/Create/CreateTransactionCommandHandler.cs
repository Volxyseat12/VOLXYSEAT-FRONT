using MediatR;
using VOLXYSEAT.API.Application.Extensions;
using VOLXYSEAT.API.Application.Models.Dtos.Transaction;
using VOLXYSEAT.DOMAIN.Exceptions;
using VOLXYSEAT.DOMAIN.Repositories;

namespace VOLXYSEAT.API.Application.Commands.Transaction.Create;

public class CreateTransactionCommandHandler : IRequestHandler<CreateTransactionCommand, TransactionDto>
{
    private readonly ITransactionRepository _repository;

    public CreateTransactionCommandHandler(ITransactionRepository repository)
    {
        _repository = repository ?? throw new VolxyseatDomainException(nameof(repository));
    }
    public async Task<TransactionDto> Handle(CreateTransactionCommand request, CancellationToken cancellationToken)
    {
        if (request == null) throw new VolxyseatDomainException(nameof(request));

        var transaction = new DOMAIN.Models.Transaction(request.SubscriptionId, request.ClientId, request.MercadoPagoSubscriptionId);

        await _repository.AddAsync(transaction);
        await _repository.UnitOfWork.SaveChangesAsync(cancellationToken);

        return transaction.ToTransactionDto();

    }
}
