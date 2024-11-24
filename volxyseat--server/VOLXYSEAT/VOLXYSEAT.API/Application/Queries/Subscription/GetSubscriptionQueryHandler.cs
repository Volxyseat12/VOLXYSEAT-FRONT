using MediatR;
using Volxyseat.API.Application.Queries.Subscription;
using VOLXYSEAT.API.Application.Models.Dtos.Subscription;
using VOLXYSEAT.DOMAIN.Exceptions;
using VOLXYSEAT.DOMAIN.Repositories;

namespace VOLXYSEAT.API.Application.Queries.Subscription
{
    public class GetSubscriptionQueryHandler : IRequestHandler<GetSubscriptionQuery, SubscriptionDto>
    {
        private readonly ISubscriptionRepository _subscriptionRepository;

        public GetSubscriptionQueryHandler(ISubscriptionRepository subscriptionRepository)
        {
            _subscriptionRepository = subscriptionRepository;
        }

        public async Task<SubscriptionDto> Handle(GetSubscriptionQuery request, CancellationToken cancellationToken)
        {
            var subscription = await _subscriptionRepository.GetByIdAsync(request.Id);

            if (subscription == null)
            {
                throw new VolxyseatDomainException("Subscription not found.");
            }

            var subscriptionDto = new SubscriptionDto
            {
                Id = subscription.Id,
                Type = subscription.TypeId,
                Status = subscription.StatusId,
                Description = subscription.Description,
                MercadoPagoPlanId = subscription.MercadoPagoPlanId,
                Price = subscription.Price,
                CreatedOn = subscription.CreatedOn,
                UpdatedOn = subscription.UpdatedOn,
                SubscriptionProperties = subscription.SubscriptionProperties != null
            ? new SubscriptionPropertiesDto
            {
                Support = subscription.SubscriptionProperties.Support,
                Phone = subscription.SubscriptionProperties.Phone,
                Email = subscription.SubscriptionProperties.Email,
                Messenger = subscription.SubscriptionProperties.Messenger,
                Chat = subscription.SubscriptionProperties.Chat,
                LiveSupport = subscription.SubscriptionProperties.LiveSupport,
                Documentation = subscription.SubscriptionProperties.Documentation,
                Onboarding = subscription.SubscriptionProperties.Onboarding,
                Training = subscription.SubscriptionProperties.Training,
                Updates = subscription.SubscriptionProperties.Updates,
                Backup = subscription.SubscriptionProperties.Backup,
                Customization = subscription.SubscriptionProperties.Customization,
                Analytics = subscription.SubscriptionProperties.Analytics,
                Integration = subscription.SubscriptionProperties.Integration,
                APIAccess = subscription.SubscriptionProperties.APIAccess,
                CloudStorage = subscription.SubscriptionProperties.CloudStorage,
                MultiUser = subscription.SubscriptionProperties.MultiUser,
                PrioritySupport = subscription.SubscriptionProperties.PrioritySupport,
                SLA = subscription.SubscriptionProperties.SLA,
                ServiceLevel = subscription.SubscriptionProperties.ServiceLevel
            }
            : null
            };
            return subscriptionDto;
        }
    }
}
