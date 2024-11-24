using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using VOLXYSEAT.API.Application.Models.Dtos.Account;
using VOLXYSEAT.DOMAIN.Models;
using VOLXYSEAT.DOMAIN.Repositories;
using VOLXYSEAT.INFRASTRUCTURE.Services;

namespace VOLXYSEAT.API.Application.Commands.Account.Register
{
    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, bool>
    {
        private readonly JWTService _jwtService;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public RegisterUserCommandHandler(JWTService jwtService,
            SignInManager<User> signInManager,
            UserManager<User> userManager)
        {
            _jwtService = jwtService;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        private async Task<bool> CheckEmailExistsAsync(string email)
        {
            return await _userManager.Users.AnyAsync(u => u.Email == email);
        }

        public async Task<bool> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            if (await CheckEmailExistsAsync(request.Email))
                return false;

            var userToAdd = new User(request.Name)
            {
                UserName = request.Email.ToLower(),
                Email = request.Email.ToLower(),
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(userToAdd, request.Password);

            if (!result.Succeeded)
                return false;

            await _userManager.AddToRoleAsync(userToAdd, "user");

            return true;

        }
    }
}
