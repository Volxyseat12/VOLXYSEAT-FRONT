using MediatR;
using Volxyseat.API.Application.Queries.Subscription;
using VOLXYSEAT.API.Application.Models.Dtos.Subscription;
using VOLXYSEAT.DOMAIN.Exceptions;
using VOLXYSEAT.DOMAIN.Repositories;

namespace VOLXYSEAT.API.Application.Queries.Subscription
{
    public class GetAllSubscriptionHandler : IRequestHandler<GetAllSubscriptionQuery, IEnumerable<SubscriptionDto>>
    {
        private readonly ISubscriptionRepository _repository;

        public GetAllSubscriptionHandler(ISubscriptionRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        public async Task<IEnumerable<SubscriptionDto>> Handle(GetAllSubscriptionQuery request, CancellationToken cancellationToken)
        {
            var subscriptions = await _repository.GetAllAsync();

            if (subscriptions == null)
                throw new VolxyseatDomainException("No subscriptions found.");

            var data = subscriptions.Select(item => new SubscriptionDto
            {
                Id = item.Id,
                Type = item.TypeId,
                Status = item.StatusId,
                Description = item.Description,
                Price = item.Price,
                CreatedOn = item.CreatedOn,
                UpdatedOn = item.UpdatedOn,
                MercadoPagoPlanId = item.MercadoPagoPlanId,
                SubscriptionProperties = item.SubscriptionProperties != null
                    ? new SubscriptionPropertiesDto
                    {
                        Support = item.SubscriptionProperties.Support,
                        Phone = item.SubscriptionProperties.Phone,
                        Email = item.SubscriptionProperties.Email,
                        Messenger = item.SubscriptionProperties.Messenger,
                        Chat = item.SubscriptionProperties.Chat,
                        LiveSupport = item.SubscriptionProperties.LiveSupport,
                        Documentation = item.SubscriptionProperties.Documentation,
                        Onboarding = item.SubscriptionProperties.Onboarding,
                        Training = item.SubscriptionProperties.Training,
                        Updates = item.SubscriptionProperties.Updates,
                        Backup = item.SubscriptionProperties.Backup,
                        Customization = item.SubscriptionProperties.Customization,
                        Analytics = item.SubscriptionProperties.Analytics,
                        Integration = item.SubscriptionProperties.Integration,
                        APIAccess = item.SubscriptionProperties.APIAccess,
                        CloudStorage = item.SubscriptionProperties.CloudStorage,
                        MultiUser = item.SubscriptionProperties.MultiUser,
                        PrioritySupport = item.SubscriptionProperties.PrioritySupport,
                        SLA = item.SubscriptionProperties.SLA,
                        ServiceLevel = item.SubscriptionProperties.ServiceLevel
                    }
                    : new SubscriptionPropertiesDto()
            }).ToList();

            return data;
        }
    }
}
