
using VOLXYSEAT.DOMAIN.Models;

namespace VOLXYSEAT.DOMAIN.Repositories
{
    public interface ISubscriptionRepository : IRepository<Subscription, Guid>
    {
        Task AddAsync(Subscription obj);
        Task<IEnumerable<Subscription>> GetAllAsync();
        Task Update(Subscription obj);
        Task<Subscription> GetByIdAsync(Guid id);
    }
}
