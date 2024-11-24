using MediatR;
using VOLXYSEAT.DOMAIN.Repositories;

namespace VOLXYSEAT.API.Application.Commands.Transaction.Disable;

public class DisableTransactionHandler : IRequestHandler<DisableTransactionCommand, bool>
{
    private readonly ITransactionRepository _repository;
    public DisableTransactionHandler(ITransactionRepository repository)
    {
        _repository = repository;
    }
    public async Task<bool> Handle(DisableTransactionCommand request, CancellationToken cancellationToken)
    {
        var transaction = await _repository.GetByClientId(request.ClientId);

        if (transaction == null) return false;

        transaction.Disable();

        _repository.DisableTransaction(transaction);
        var result = await _repository.UnitOfWork.SaveChangesAsync(cancellationToken);

        return result > 0;
    }
}
