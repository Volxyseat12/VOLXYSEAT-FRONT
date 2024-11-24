using Dapper;
using Microsoft.EntityFrameworkCore;
using System.Data;
using VOLXYSEAT.DOMAIN.Exceptions;
using VOLXYSEAT.DOMAIN.Models;
using VOLXYSEAT.DOMAIN.Repositories;
using VOLXYSEAT.INFRASTRUCTURE.Data;

namespace VOLXYSEAT.INFRASTRUCTURE.Repositories
{
    public class SubscriptionRepository : BaseRepository<Subscription, Guid>, ISubscriptionRepository
    {
        private readonly DataContext _context;
        public SubscriptionRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Subscription> GetByIdAsync(Guid id)
        {
            var subscription = await _context.Subscriptions
                .AsNoTracking()
                .Include(s => s.SubscriptionProperties)
                .FirstOrDefaultAsync(s => s.Id == id);

            return subscription;
        }

        public async Task AddAsync(Subscription subscription)
        {
            if (subscription == null) throw new VolxyseatDomainException(nameof(subscription));

            await _context.Set<Subscription>().AddAsync(subscription);
        }


        public async Task Update(Subscription request)
        {
            if (request == null) throw new VolxyseatDomainException(nameof(request));

            _context.Update(request);
        }

        public async Task<IEnumerable<Subscription>> GetAllAsync()
        {
            var subscriptions = await _context.Subscriptions
                .AsNoTracking()
                .Include(s => s.SubscriptionProperties) 
                .OrderBy(s => s.Price)
                .ToListAsync();

            return subscriptions;
        }

    }
}
