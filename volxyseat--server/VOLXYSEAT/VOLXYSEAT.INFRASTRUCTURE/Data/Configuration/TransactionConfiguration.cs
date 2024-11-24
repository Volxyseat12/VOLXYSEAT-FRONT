using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VOLXYSEAT.DOMAIN.Models;

namespace VOLXYSEAT.INFRASTRUCTURE.Data.Configuration;
internal class TransactionConfiguration : IEntityTypeConfiguration<Transaction>
{
    public void Configure(EntityTypeBuilder<Transaction> builder)
    {
        builder.ToTable("Transactions");

        builder.HasKey(t => t.Id);

        builder.Property(t => t.SubscriptionId)
            .IsRequired();

        builder.Property(t => t.ClientId) 
            .IsRequired();

        builder.Property(t => t.CreatedOn)
            .IsRequired();
    }
}
