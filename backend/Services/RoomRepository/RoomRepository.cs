using simple_chatrooms_backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace simple_chatrooms_backend.Services.RoomRepository {
    public class RoomRepository : ARepository<Room>, IRoomRepository<Room> {

        public RoomRepository(SimpleChatroomsContext context) : base(context) { }

        public Room GetByJoinString(string joinString) {
            return _context.Rooms.Where(r => r.JoinString.ToLower().Equals(joinString.ToLower())).FirstOrDefault();
        }
    }
}
