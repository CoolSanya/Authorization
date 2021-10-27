using Authorization.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Authorization.DAL
{
    public class UserRepository : IUserRepository, IDisposable
    {
        private readonly ApplicationDbContext _db;

        private bool disposed = false;

        public UserRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public User RegisterUser(User user)
        {
            try
            {
                var createdUser = _db.Add(user);
                _db.SaveChanges();

                return createdUser.Entity;
            }
            catch (Exception)
            {
                throw new Exception("Email is exist");
            }
        }
        public User CheckPassword(string email, string password)
        {
            var user = _db.Users.SingleOrDefault(x => x.Email == email);
            if (user == null)
                throw new Exception("Invalid email. User not found");

            if (BCrypt.Net.BCrypt.Verify(password, user.Password))
                return user;

            return null;
        }
        public void DeleteUser(string email)
        {
            var user = _db.Users.SingleOrDefault(x => x.Email == email);
            if (user == null)
                throw new Exception("Invalid email. User not found");
            _db.Users.Remove(user);
            _db.SaveChanges();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _db.Dispose();
                }
            }
            this.disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public User EditUser(User user)
        {
            var editedUser = _db.Users.SingleOrDefault(x => x.Id == user.Id);
            if (editedUser == null)
                throw new Exception("Invalid email. User not found");

            editedUser.FirstName = user.FirstName;
            editedUser.LastName = user.LastName;
            editedUser.Email = user.Email;
            editedUser.Password = user.Password;

            _db.SaveChanges();
            return editedUser;
        }

        public User GetUserById(int id)
        {
            return _db.Users.FirstOrDefault(u => u.Id == id);
        }
    }
}
