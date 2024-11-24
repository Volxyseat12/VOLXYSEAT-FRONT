using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VOLXYSEAT.DOMAIN.Core;

namespace VOLXYSEAT.DOMAIN.Models
{
    public class User : IdentityUser
    {
        public User(string name)
        {
            Name = name;
        }

        public string Name { get; private set; }
    }
}
