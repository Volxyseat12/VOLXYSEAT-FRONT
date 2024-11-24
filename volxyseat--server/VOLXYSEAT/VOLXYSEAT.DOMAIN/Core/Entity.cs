using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace VOLXYSEAT.DOMAIN.Core
{
    public interface IEntity
    {
    }

    public abstract class Entity : IEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
    }
}
