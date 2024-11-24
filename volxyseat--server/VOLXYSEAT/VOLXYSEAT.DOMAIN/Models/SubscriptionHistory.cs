using VOLXYSEAT.DOMAIN.Core;

namespace VOLXYSEAT.DOMAIN.Models
{
    public class SubscriptionHistory : Entity
    {
        public SubscriptionHistory(Guid subscriptionId, string updatedBy, SubscriptionStatus oldStatus, SubscriptionStatus newStatus, string comment)
        {
            SubscriptionId = subscriptionId;
            UpdatedBy = updatedBy;
            OldStatus = oldStatus;
            NewStatus = newStatus;
            Comment = comment;
        }

        public Guid SubscriptionId { get; private set; }
        public string UpdatedBy { get; private set; }
        public SubscriptionStatus OldStatus { get; private set; }
        public SubscriptionStatus NewStatus { get; private set; }
        public string Comment { get; private set; }
    }
}
