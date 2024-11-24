using MediatR;
using System;
using VOLXYSEAT.API.Application.Models.Dtos.Subscription;
using VOLXYSEAT.API.Application.Models.Requests.Subscription;
using VOLXYSEAT.DOMAIN.Models;

namespace VOLXYSEAT.API.Application.Commands.Subscription.Create
{
    public record CreateSubscriptionCommand(SubscriptionRequest Subscription) : IRequest<bool>;
}
