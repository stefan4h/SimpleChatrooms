using simple_chatrooms_backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace simple_chatrooms_backend.Services.MessageRepository {
    public class MessageRepository : ARepository<Message>, IMessageRepository<Message> {
        public MessageRepository(SimpleChatroomsContext context) : base(context) { }
    }
}
