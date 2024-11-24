using MediatR;

namespace VOLXYSEAT.API.Application.Commands.Account.Register
{
    public record class RegisterUserCommand(
        string Name,
        string Email,
        string Password) : IRequest<bool>;
}
