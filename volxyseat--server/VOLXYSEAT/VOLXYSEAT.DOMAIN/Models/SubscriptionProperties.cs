using System;
using VOLXYSEAT.DOMAIN.Core;

namespace VOLXYSEAT.DOMAIN.Models
{
    public class SubscriptionProperties : Entity
    {
        private SubscriptionProperties() { }

        public SubscriptionProperties(
            Guid subscriptionId,
            bool support,
            bool phone,
            bool email,
            bool messenger,
            bool chat,
            bool liveSupport,
            bool documentation,
            bool onboarding,
            bool training,
            bool updates,
            bool backup,
            bool customization,
            bool analytics,
            bool integration,
            bool apiAccess,
            bool cloudStorage,
            bool multiUser,
            bool prioritySupport,
            bool sla,
            bool serviceLevel
        )
        {
            SubscriptionId = subscriptionId;
            Support = support;
            Phone = phone;
            Email = email;
            Messenger = messenger;
            Chat = chat;
            LiveSupport = liveSupport;
            Documentation = documentation;
            Onboarding = onboarding;
            Training = training;
            Updates = updates;
            Backup = backup;
            Customization = customization;
            Analytics = analytics;
            Integration = integration;
            APIAccess = apiAccess;
            CloudStorage = cloudStorage;
            MultiUser = multiUser;
            PrioritySupport = prioritySupport;
            SLA = sla;
            ServiceLevel = serviceLevel;
        }

        public bool Support { get; private set; }
        public bool Phone { get; private set; }
        public bool Email { get; private set; }
        public bool Messenger { get; private set; }
        public bool Chat { get; private set; }
        public bool LiveSupport { get; private set; }
        public bool Documentation { get; private set; }
        public bool Onboarding { get; private set; }
        public bool Training { get; private set; }
        public bool Updates { get; private set; }
        public bool Backup { get; private set; }
        public bool Customization { get; private set; }
        public bool Analytics { get; private set; }
        public bool Integration { get; private set; }
        public bool APIAccess { get; private set; }
        public bool CloudStorage { get; private set; }
        public bool MultiUser { get; private set; }
        public bool PrioritySupport { get; private set; }
        public bool SLA { get; private set; }
        public bool ServiceLevel { get; private set; }
        public Guid SubscriptionId { get; private set; }
        public Subscription Subscription { get; set; }
    }
}