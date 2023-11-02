using simple_chatrooms_backend.Entities;
using simple_chatrooms_backend.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace simple_chatrooms_backend.Repositories.UserRepository
{
    public interface IUserRepository<T> : IRepository<T> where T : class
    {
        void AddRoom(Guid id, Room room);

        void RemoveRoom(Guid id, Guid roomId);

        bool HasRoom(Guid id, Guid roomId);

        public User GetOneWithRooms(Guid id);

        public User GetOneByUsername(string username);
    }
}
