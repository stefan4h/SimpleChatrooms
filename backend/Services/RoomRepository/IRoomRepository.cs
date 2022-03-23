using simple_chatrooms_backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace simple_chatrooms_backend.Services.RoomRepository {
    public interface IRoomRepository<T> : IRepository<T> where T : class {

        IEnumerable<Room> FindRooms(string q);

        Room GetByJoinString(string joinString);

        IEnumerable<Room> GetByUser(Guid userId);

        Room GetOneWithUsers(Guid roomId);
    }
}
