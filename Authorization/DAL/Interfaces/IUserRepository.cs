using Authorization.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Authorization.DAL
{
    public interface IUserRepository : IDisposable
    {
        User RegisterUser(User user);
        User CheckPassword(string email, string password);
        void DeleteUser(string email);
        User EditUser(User user);
        User GetUserById(int id);
    }
}
