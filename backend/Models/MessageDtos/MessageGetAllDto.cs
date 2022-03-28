using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace simple_chatrooms_backend.Models.MessageDtos {
    public class MessageGetAllDto {
        public Dictionary<Guid, Guid?> RoomsWithLastMessageReceived { get; set; }
    }
}
