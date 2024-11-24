using MediatR;
using VOLXYSEAT.API.Application.Models.Dtos.Transaction;
using VOLXYSEAT.DOMAIN.Exceptions;
using VOLXYSEAT.DOMAIN.Repositories;

namespace VOLXYSEAT.API.Application.Queries.Transaction.GetByUserId;

public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, DOMAIN.Models.Transaction>
{
    private readonly ITransactionRepository _repository;
    public GetUserByIdQueryHandler(ITransactionRepository repository)
    {
        _repository = repository ?? throw new ArgumentNullException(nameof(repository));
    }
    public Task<DOMAIN.Models.Transaction> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
    {
        var transaction = _repository.GetByClientId(request.Id);

        if (transaction == null)
            throw new VolxyseatDomainException("No subscriptions found.");

        return transaction;
    }
}
