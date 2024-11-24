namespace VOLXYSEAT.API.Application.Responses;

public record LoginUserResponse(string Name, string JWT, string Email, string ClientId);
