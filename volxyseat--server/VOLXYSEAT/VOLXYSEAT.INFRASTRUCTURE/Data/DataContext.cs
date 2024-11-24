using Microsoft.EntityFrameworkCore;
using VOLXYSEAT.DOMAIN.Core;
using VOLXYSEAT.DOMAIN.Models;
using MediatR;
using VOLXYSEAT.INFRASTRUCTURE.Data.Configuration;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace VOLXYSEAT.INFRASTRUCTURE.Data
{
    public class DataContext : IdentityDbContext<User>, IUnitOfWork
    {
        private readonly IMediator _mediator;
        public const string DEFAULT_SCHEMA = "volxyseat";

        public DataContext(DbContextOptions<DataContext> options, IMediator mediator) : base(options)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<SubscriptionHistory> SubscriptionHistories { get; set; }
        public DbSet<SubscriptionProperties> SubscriptionProperties { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);

        }
    }
}
