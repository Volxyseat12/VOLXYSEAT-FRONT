using MediatR;
using VOLXYSEAT.API.Application.Request;
using VOLXYSEAT.DOMAIN.Exceptions;
using VOLXYSEAT.DOMAIN.Models;
using VOLXYSEAT.DOMAIN.Repositories;

namespace VOLXYSEAT.API.Application.Commands.Subscription.Create
{
    public class CreateSubscriptionCommandHandler : IRequestHandler<CreateSubscriptionCommand, bool>
    {
        private readonly ISubscriptionRepository _repository;

        public CreateSubscriptionCommandHandler(ISubscriptionRepository repository)
        {
            _repository = repository ?? throw new VolxyseatDomainException(nameof(repository));
        }

        public async Task<bool> Handle(CreateSubscriptionCommand request, CancellationToken cancellationToken)
        {
            if (request == null) throw new VolxyseatDomainException(nameof(request));

            var subscription = new DOMAIN.Models.Subscription(
                request.Subscription.TypeId,
                request.Subscription.StatusId,
                request.Subscription.Description,
                request.Subscription.Price,
                request.Subscription.MercadoPagoPlanId
            );
            var subscriptionPropertiesDto = request.Subscription.SubscriptionProperties;
            var subscriptionProperties = new SubscriptionProperties(
                subscription.Id,
                subscriptionPropertiesDto.Support,
                subscriptionPropertiesDto.Phone,
                subscriptionPropertiesDto.Email,
                subscriptionPropertiesDto.Messenger,
                subscriptionPropertiesDto.Chat,
                subscriptionPropertiesDto.LiveSupport,
                subscriptionPropertiesDto.Documentation,
                subscriptionPropertiesDto.Onboarding,
                subscriptionPropertiesDto.Training,
                subscriptionPropertiesDto.Updates,
                subscriptionPropertiesDto.Backup,
                subscriptionPropertiesDto.Customization,
                subscriptionPropertiesDto.Analytics,
                subscriptionPropertiesDto.Integration,
                subscriptionPropertiesDto.APIAccess,
                subscriptionPropertiesDto.CloudStorage,
                subscriptionPropertiesDto.MultiUser,
                subscriptionPropertiesDto.PrioritySupport,
                subscriptionPropertiesDto.SLA,
                subscriptionPropertiesDto.ServiceLevel
            );


            subscription.SubscriptionProperties = subscriptionProperties;


            await _repository.AddAsync(subscription);
            var result = await _repository.UnitOfWork.SaveChangesAsync(cancellationToken);
            return result > 0;
        }
    }
}