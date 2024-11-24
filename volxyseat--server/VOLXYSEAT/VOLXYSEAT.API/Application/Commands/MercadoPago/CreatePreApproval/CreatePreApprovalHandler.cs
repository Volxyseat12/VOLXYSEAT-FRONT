using MediatR;
using System.Net.Http.Headers;
using VOLXYSEAT.API.Application.Models.Responses;

namespace VOLXYSEAT.API.Application.Commands.MercadoPago.CreatePreApproval;

public class CreatePreApprovalHandler : IRequestHandler<CreatePreApprovalCommand, PreApprovalResponse>
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    public CreatePreApprovalHandler(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    public async Task<PreApprovalResponse> Handle(CreatePreApprovalCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var httpClient = _httpClientFactory.CreateClient();
            var accessToken = _configuration["ACCESS_TOKEN"];

            var httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, "https://api.mercadopago.com/preapproval")
            {
                Content = JsonContent.Create(new
                {
                    preapproval_plan_id = request.PreApprovalPlanId,
                    reason = request.Reason,
                    external_reference = "YG-1234",
                    payer_email = request.Email,
                    card_token_id = request.CardTokenId,
                    auto_recurring = new
                    {
                        frequency = 1,
                        frequency_type = "months",
                        transaction_amount = request.Amount,
                        currency_id = "BRL"
                    },
                    back_url = "https://www.mercadopago.com.br",
                    status = "authorized"
                })
            };

            httpRequestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            var response = await httpClient.SendAsync(httpRequestMessage, cancellationToken);

            var result = await response.Content.ReadFromJsonAsync<PreApprovalResponse>(cancellationToken: cancellationToken);
            return result;
        } catch(Exception ex) 
        {
            throw new Exception(ex.Message);
        }
    }
}
