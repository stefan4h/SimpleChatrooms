using simple_chatrooms_backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace simple_chatrooms_backend.Services.UserRepository {
    public interface IUserRepository<T> : IRepository<T> where T : class {
        void AddRoom(Guid id, Room room);

        void RemoveRoom(Guid id, Guid roomId);

        bool HasRoom(Guid id, Guid roomId);

        public User GetOneWithRooms(Guid id);
    }
}
