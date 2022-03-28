using Microsoft.EntityFrameworkCore;
using simple_chatrooms_backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace simple_chatrooms_backend.Services.MessageRepository {
    public class MessageRepository : ARepository<Message>, IMessageRepository<Message> {
        public MessageRepository(SimpleChatroomsContext context) : base(context) { }

        public IEnumerable<Message> GetForRoom(Guid roomId, Guid? lastMessagedRecievedId) {
            var messages = _context.Messages.Where(m => m.RoomId == roomId);

            if (lastMessagedRecievedId != null)
                messages = messages.Where(m=>m.SendDate < GetOne((Guid)lastMessagedRecievedId).SendDate);

            return messages.Include("User").OrderByDescending(m => m.SendDate).ToList();
        }
    }
}
