using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VOLXYSEAT.DOMAIN.Exceptions
{
    public class VolxyseatDomainException : Exception
    {
        public VolxyseatDomainException(string message) : base(message) { }

        public VolxyseatDomainException(string message, Exception innerException) : base(message, innerException) { }
    }
}
