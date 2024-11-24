using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VOLXYSEAT.DOMAIN.Models;

namespace VOLXYSEAT.DOMAIN.Repositories;
public interface ITransactionRepository : IRepository<Transaction, Guid>
{
    Task<Transaction> GetByClientId(Guid id);
    void DisableTransaction(Transaction transaction);
}
