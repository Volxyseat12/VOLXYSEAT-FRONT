using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VOLXYSEAT.DOMAIN.Models;

namespace VOLXYSEAT.DOMAIN.Repositories
{
    public interface ISubscriptionHistoryRepository
    {
        Task AddAsync(SubscriptionHistory history);
        Task<SubscriptionHistory> GetByIdAsync(Guid id);
        Task<IEnumerable<SubscriptionHistory>> GetBySubscriptionIdAsync(Guid subscriptionId);
        Task UpdateAsync(SubscriptionHistory history);
        Task SaveChangesAsync();
    }
}
