namespace VOLXYSEAT.API.Application.Models.Dtos.Transaction;

public class TransactionDto
{  
    public Guid SubscriptionId { get; set; }
    public Guid ClientId { get; set; }
    public string MercadoPagoSubscriptionId { get; set; }

}
