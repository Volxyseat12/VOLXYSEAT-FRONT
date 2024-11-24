using MediatR;
using VOLXYSEAT.DOMAIN.Exceptions;
using VOLXYSEAT.DOMAIN.Repositories;

namespace VOLXYSEAT.API.Application.Commands.Subscription.Close
{
    public class CloseSubscriptionCommandHandler : IRequestHandler<CloseSubscriptionCommand, bool>
    {
        private readonly ISubscriptionRepository _repository;

        public CloseSubscriptionCommandHandler(ISubscriptionRepository repository)
        {
            _repository = repository ?? throw new VolxyseatDomainException(nameof(repository));
        }

        public async Task<bool> Handle(CloseSubscriptionCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
