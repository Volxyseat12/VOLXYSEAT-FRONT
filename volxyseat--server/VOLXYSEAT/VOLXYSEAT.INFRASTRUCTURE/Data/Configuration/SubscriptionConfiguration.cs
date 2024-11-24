using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VOLXYSEAT.DOMAIN.Models;

namespace VOLXYSEAT.INFRASTRUCTURE.Data.Configuration;
public class SubscriptionConfiguration : IEntityTypeConfiguration<Subscription>
{
    public void Configure(EntityTypeBuilder<Subscription> builder)
    {

        builder.ToTable("Subscriptions");

        builder.HasKey(s => s.Id);

        builder.Property(s => s.TypeId)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(s => s.StatusId)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(s => s.Description)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(s => s.Price)
            .HasColumnType("decimal(18,2)")
            .HasPrecision(18,2)
            .HasDefaultValue(0)
            .IsRequired();

        builder.Property(s => s.CreatedOn)
            .HasDefaultValueSql("GETUTCDATE()")
            .ValueGeneratedOnAdd()
            .IsRequired();

        builder.Property(s => s.UpdatedOn)
            .HasDefaultValueSql("GETUTCDATE()")
            .IsRequired();

        builder.HasMany(s => s.History)
            .WithOne()
            .HasForeignKey(h => h.SubscriptionId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_Subscription_SubscriptionHistory");

    }
}
