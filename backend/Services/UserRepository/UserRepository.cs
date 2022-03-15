using simple_chatrooms_backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace simple_chatrooms_backend.Services.UserRepository {
    public class UserRepository : ARepository<User>, IUserRepository<User> {
        public UserRepository(SimpleChatroomsContext context) : base(context) {

        }

        public void AddRoom(Guid id, Room room) {
            var roomUser = new RoomUser {
                Room = room,
                User = GetOne(id),
                JoinDate = DateTime.Now
            };
            _context.Add(roomUser);
        }
    }
}
