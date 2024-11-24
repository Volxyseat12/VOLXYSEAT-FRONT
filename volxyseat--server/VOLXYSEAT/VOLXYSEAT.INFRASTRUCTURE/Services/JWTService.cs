using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using VOLXYSEAT.DOMAIN.Models;

namespace VOLXYSEAT.INFRASTRUCTURE.Services;
public class JWTService
{
    private readonly IConfiguration _configuration;
    private readonly SymmetricSecurityKey _JWTKey;
    private readonly UserManager<User> _userManager;

    public JWTService(IConfiguration configuration, UserManager<User> userManager)
    {
        _configuration = configuration;
        _JWTKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
        _userManager = userManager;
    }

    public async Task<string> JWTGenerateToken(User user)
    {
        var userClaims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id),
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.GivenName, user.Name),
            new(ClaimTypes.Role, "user")
    };

        if (await _userManager.IsInRoleAsync(user, "admin"))
            userClaims.Add(new(ClaimTypes.Role, "admin"));

        SigningCredentials credentials = new(_JWTKey, SecurityAlgorithms.HmacSha256Signature);

        SecurityTokenDescriptor tokenDescriptor = new()
        {
            Subject = new ClaimsIdentity(userClaims),
            Expires = DateTime.UtcNow.AddDays(int.Parse(_configuration["JWT:ExpiresInDays"])),
            SigningCredentials = credentials,
            Issuer = _configuration["JWT:Issuer"],
            Audience = _configuration["JWT:Audience"]
        };

        var tokenHandler = new JwtSecurityTokenHandler();

        var jwt = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(jwt);
    }
}
