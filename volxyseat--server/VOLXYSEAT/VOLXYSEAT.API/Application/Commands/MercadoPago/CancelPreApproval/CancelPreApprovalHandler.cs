using MediatR;
using System.Net.Http.Headers;
using VOLXYSEAT.API.Application.Models.Responses;
using VOLXYSEAT.DOMAIN.Repositories;

namespace VOLXYSEAT.API.Application.Commands.MercadoPago.CancelPreApproval;

public class CancelPreApprovalHandler : IRequestHandler<CancelPreApprovalCommand, PreApprovalResponse>
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    public CancelPreApprovalHandler(IConfiguration configuration, IHttpClientFactory httpClientFactory)
    {
        _configuration = configuration;
        _httpClientFactory = httpClientFactory;
    }

    public async Task<PreApprovalResponse> Handle(CancelPreApprovalCommand request, CancellationToken cancellationToken)
    {
        var httpClient = _httpClientFactory.CreateClient();
        var accessToken = _configuration["ACCESS_TOKEN"];

        var httpRequestMessage = new HttpRequestMessage(HttpMethod.Put, $"https://api.mercadopago.com/preapproval/{request.Id}")
        {
            Content = JsonContent.Create(new
            {
                status = "cancelled"
            })
        };

        httpRequestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

        var response = await httpClient.SendAsync(httpRequestMessage, cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            throw new HttpRequestException($"Erro ao cancelar a pre-approval: {response.ReasonPhrase}");
        }

        var result = await response.Content.ReadFromJsonAsync<PreApprovalResponse>(cancellationToken: cancellationToken);
        return result ?? throw new InvalidOperationException("Resposta inválida recebida da API.");
    }

}
