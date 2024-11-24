using System.ComponentModel.DataAnnotations;
using VOLXYSEAT.DOMAIN.Core;
using VOLXYSEAT.DOMAIN.Exceptions;

namespace VOLXYSEAT.DOMAIN.Models
{
    public class Subscription : Entity
    {
        private readonly List<SubscriptionHistory> _histories;
        public SubscriptionProperties SubscriptionProperties { get; set; }

        private Subscription()
        {
            _histories = new List<SubscriptionHistory>();
        }
        public Subscription(
            SubscriptionEnum typeId,
            SubscriptionStatus statusId,
            string description,
            decimal price,
            string mercadoPagoPlanId)
        {
            TypeId = typeId;
            StatusId = statusId;
            Description = description;
            Price = price;
            MercadoPagoPlanId = mercadoPagoPlanId;
        }
        public SubscriptionEnum TypeId { get; private set; }
        public SubscriptionStatus StatusId { get; private set; }
        public string Description { get; private set; }
        public decimal Price { get; private set; }
        public DateTime CreatedOn { get; private set; }
        public DateTime UpdatedOn { get; private set; }
        public string MercadoPagoPlanId { get; private set; }
        public List<SubscriptionHistory> History => _histories;

        public void UpdateDetails(
            SubscriptionEnum typeId,
            SubscriptionStatus statusId,
            string description,
            decimal price,
            string mercadoPagoPlanId,
            DateTime updatedOn)
        {
            TypeId = typeId;
            StatusId = statusId;
            Description = description;
            Price = price;
            MercadoPagoPlanId = mercadoPagoPlanId;
            UpdatedOn = updatedOn;    
        }
    }
}
