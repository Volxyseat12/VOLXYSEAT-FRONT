using VOLXYSEAT.API.Application.Models.Dtos.Subscription;
using VOLXYSEAT.DOMAIN.Models;

namespace VOLXYSEAT.API.Application.Models.Requests.Subscription
{
    public class SubscriptionRequest
    {
        public SubscriptionEnum TypeId { get; set; }
        public SubscriptionStatus StatusId { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string MercadoPagoPlanId { get; set; }
        public SubscriptionPropertiesDto SubscriptionProperties { get; set; }
    }
}
