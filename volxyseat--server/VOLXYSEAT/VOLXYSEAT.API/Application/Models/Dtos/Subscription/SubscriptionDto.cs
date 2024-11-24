using VOLXYSEAT.DOMAIN.Models;

namespace VOLXYSEAT.API.Application.Models.Dtos.Subscription
{
    public class SubscriptionDto
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public SubscriptionEnum Type { get; set; }
        public SubscriptionStatus Status { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public DateTime CreatedOn { get; set; }
        public string MercadoPagoPlanId { get; set; }
        public DateTime UpdatedOn { get; set; }
        public SubscriptionPropertiesDto SubscriptionProperties { get; set; }
    }
}
