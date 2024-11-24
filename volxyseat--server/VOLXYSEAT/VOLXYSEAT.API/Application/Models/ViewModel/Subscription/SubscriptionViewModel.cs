using VOLXYSEAT.API.Application.Models.Dtos.Subscription;
using VOLXYSEAT.DOMAIN.Models;

namespace VOLXYSEAT.API.Application.Models.ViewModel.Subscription
{
    public class SubscriptionViewModel
    {
        public SubscriptionEnum Type { get; set; }
        public SubscriptionStatus Status { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public SubscriptionPropertiesDto SubscriptionProperties { get; set; }
    }
}
