using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VOLXYSEAT.DOMAIN.Models;

namespace VOLXYSEAT.INFRASTRUCTURE.Data.Configuration
{
    public class SubscriptionPropertiesConfiguration : IEntityTypeConfiguration<SubscriptionProperties>
    {
        public void Configure(EntityTypeBuilder<SubscriptionProperties> builder)
        {
            builder.ToTable("SubscriptionProperties");

            builder.HasKey(sp => sp.SubscriptionId);

            builder.Property(sp => sp.Support).IsRequired();
            builder.Property(sp => sp.Phone).IsRequired();
            builder.Property(sp => sp.Email).IsRequired();
            builder.Property(sp => sp.Messenger).IsRequired();
            builder.Property(sp => sp.Chat).IsRequired();
            builder.Property(sp => sp.LiveSupport).IsRequired();
            builder.Property(sp => sp.Documentation).IsRequired();
            builder.Property(sp => sp.Onboarding).IsRequired();
            builder.Property(sp => sp.Training).IsRequired();
            builder.Property(sp => sp.Updates).IsRequired();
            builder.Property(sp => sp.Backup).IsRequired();
            builder.Property(sp => sp.Customization).IsRequired();
            builder.Property(sp => sp.Analytics).IsRequired();
            builder.Property(sp => sp.Integration).IsRequired();
            builder.Property(sp => sp.APIAccess).IsRequired();
            builder.Property(sp => sp.CloudStorage).IsRequired();
            builder.Property(sp => sp.MultiUser).IsRequired();
            builder.Property(sp => sp.PrioritySupport).IsRequired();
            builder.Property(sp => sp.SLA).IsRequired();
            builder.Property(sp => sp.ServiceLevel).IsRequired();

            builder.HasOne(sp => sp.Subscription)
                   .WithOne(s => s.SubscriptionProperties)
                   .HasForeignKey<SubscriptionProperties>(sp => sp.SubscriptionId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
