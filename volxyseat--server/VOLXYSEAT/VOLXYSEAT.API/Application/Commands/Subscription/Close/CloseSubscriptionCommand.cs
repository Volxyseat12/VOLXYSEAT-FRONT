using MediatR;

namespace VOLXYSEAT.API.Application.Commands.Subscription.Close
{
    public record class CloseSubscriptionCommand(Guid Id, string Comment) : IRequest<bool> { }
}