using MediatR;
using System.Net.Http.Headers;
using VOLXYSEAT.API.Application.Commands.MercadoPago.CreatePreApproval;
using VOLXYSEAT.API.Application.Models.Responses;

namespace VOLXYSEAT.API.Application.Commands.MercadoPago.CreatePreApprovalPlan;

public class CreatePreApprovalPlanHandler : IRequestHandler<CreatePreApprovalPlanCommand, PreApprovalPlanResponse>
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    public CreatePreApprovalPlanHandler(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    public async Task<PreApprovalPlanResponse> Handle(CreatePreApprovalPlanCommand request, CancellationToken cancellationToken)
    {
        var httpClient = _httpClientFactory.CreateClient();
        var accessToken = _configuration["ACCESS_TOKEN"]; // Obter o token do arquivo de configuração

        var httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, "https://api.mercadopago.com/preapproval_plan")
        {
            Content = JsonContent.Create(new
            {
                reason = request.Reason,
                auto_recurring = new
                {
                    frequency = 1,
                    frequency_type = "months",
                    billing_day = 10,
                    billing_day_proportional = false,
                    transaction_amount = request.Amount,
                    currency_id = "BRL"
                },
                payment_methods_allowed = new
                {
                    payment_types = new[]
                    {
                        new { id = "credit_card" }
                    }
                },
                back_url = "https://www.yoursite.com"
            })
        };

        httpRequestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

        var response = await httpClient.SendAsync(httpRequestMessage, cancellationToken);
        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadFromJsonAsync<PreApprovalPlanResponse>();
        return result;
    }
}



