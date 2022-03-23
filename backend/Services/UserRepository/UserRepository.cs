using Microsoft.EntityFrameworkCore;
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

        public User GetOneWithRooms(Guid id) {
            return _context.Users.Include(u => u.Rooms).Where(u => u.Id == id).FirstOrDefault();
        }

        public void RemoveRoom(Guid id, Guid roomId) {
            GetOneWithRooms(id).Rooms.Remove(_context.Rooms.Find(roomId));
        }
    }
}
