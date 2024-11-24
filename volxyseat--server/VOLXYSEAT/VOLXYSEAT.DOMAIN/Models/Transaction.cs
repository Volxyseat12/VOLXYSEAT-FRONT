using VOLXYSEAT.DOMAIN.Core;

namespace VOLXYSEAT.DOMAIN.Models;
public class Transaction : Entity
{
    public Transaction(Guid subscriptionId, Guid clientId, string mercadoPagoSubscriptionId)
    {
        SubscriptionId = subscriptionId;
        ClientId = clientId;
        MercadoPagoSubscriptionId = mercadoPagoSubscriptionId;
        IsActive = true;
    }

    public Transaction() { }
    public Guid SubscriptionId { get; private set; }
    public Guid ClientId { get; private set; }
    public string MercadoPagoSubscriptionId { get; private set; }
    public bool IsActive { get; private set; }
    public DateTime CreatedOn { get; private set; }

    public void Disable()
    {
        IsActive = false;
    }
}
