using MediatR;
using VOLXYSEAT.API.Application.Models.Dtos.Subscription;
using VOLXYSEAT.API.Application.Models.ViewModel.Subscription;

namespace Volxyseat.API.Application.Queries.Subscription
{
    public record GetSubscriptionQuery(Guid Id) : IRequest<SubscriptionDto>;

    public record GetAllSubscriptionQuery : IRequest<IEnumerable<SubscriptionDto>>;
}