using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using VOLXYSEAT.DOMAIN.Models;

namespace VOLXYSEAT.API.Application.Commands.Account.Logout;


public record LogoutCommand(Guid Id) : IRequest<bool>;
public class LogoutCommandHandler(SignInManager<User> signInManager) : IRequestHandler<LogoutCommand, bool>
{
    private readonly SignInManager<User> _signInManager = signInManager;

    public async Task<bool> Handle(LogoutCommand request, CancellationToken cancellationToken)
    {
        await _signInManager.SignOutAsync();
        return true;
    }
}
