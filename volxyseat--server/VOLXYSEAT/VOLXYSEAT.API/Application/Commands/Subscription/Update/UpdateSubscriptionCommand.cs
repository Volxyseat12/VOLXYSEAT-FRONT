using MediatR;
using VOLXYSEAT.API.Application.Models.Dtos.Subscription;
using VOLXYSEAT.API.Application.Models.Requests.Subscription;
using VOLXYSEAT.API.Application.Request;
using VOLXYSEAT.DOMAIN.Models;

namespace VOLXYSEAT.API.Application.Commands.Subscription.Update
{
    public record UpdateSubscriptionCommand (Guid Id, SubscriptionRequest Subscription) : IRequest<bool>;
}
