using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VOLXYSEAT.DOMAIN.Models;
using VOLXYSEAT.DOMAIN.Repositories;
using VOLXYSEAT.INFRASTRUCTURE.Data;

namespace VOLXYSEAT.INFRASTRUCTURE.Repositories
{
    public class SubscriptionHistoryRepository : ISubscriptionHistoryRepository
    {
        private readonly DataContext _dataContext;
        private readonly DbSet<SubscriptionHistory> _histories;

        public SubscriptionHistoryRepository(DataContext dataContext)
        {
            _dataContext = dataContext ?? throw new ArgumentNullException(nameof(dataContext));
            _histories = _dataContext.Set<SubscriptionHistory>();
        }

        public async Task AddAsync(SubscriptionHistory history)
        {
            await _histories.AddAsync(history);
        }

        public async Task<SubscriptionHistory> GetByIdAsync(Guid id)
        {
            return await _histories.FindAsync(id);
        }

        public async Task<IEnumerable<SubscriptionHistory>> GetBySubscriptionIdAsync(Guid subscriptionId)
        {
            return await _histories.Where(h => h.SubscriptionId == subscriptionId).ToListAsync();
        }

        public async Task UpdateAsync(SubscriptionHistory history)
        {
            _histories.Update(history);
            await Task.CompletedTask;
        }

        public async Task SaveChangesAsync()
        {
            await _dataContext.SaveChangesAsync();
        }
    }
}
