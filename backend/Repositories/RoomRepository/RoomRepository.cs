using Microsoft.EntityFrameworkCore;
using simple_chatrooms_backend.Entities;
using simple_chatrooms_backend.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace simple_chatrooms_backend.Repositories.RoomRepository
{
    public class RoomRepository : ARepository<Room>, IRoomRepository<Room>
    {

        public RoomRepository(SimpleChatroomsContext context) : base(context) { }

        public IEnumerable<Room> FindRooms(string q)
        {
            q = q.ToUpper();
            return _context.Rooms.Where(r => r.JoinString.ToUpper().Contains(q) || r.Name.ToUpper().Contains(q)).ToList();
        }

        public Room GetByJoinString(string joinString)
        {
            return _context.Rooms.Where(r => r.JoinString.ToLower().Equals(joinString.ToLower())).FirstOrDefault();
        }

        public IEnumerable<Room> GetByUser(Guid userId)
        {
            return _context.Users.Where(u => u.Id == userId).SelectMany(u => u.Rooms).Include(r => r.Users);
        }

        public Room GetOneWithUsers(Guid roomId)
        {
            return _context.Rooms.Include(r => r.Users).Where(r => r.Id == roomId).FirstOrDefault();
        }
    }
}
