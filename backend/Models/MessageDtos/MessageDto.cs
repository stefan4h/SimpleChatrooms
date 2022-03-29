using simple_chatrooms_backend.Models.UserDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace simple_chatrooms_backend.Models.MessageDtos {
    public class MessageDto {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public DateTime SendDate { get; set; }
        public Guid UserId { get; set; }
        public UserDto User { get; set; }
        public Guid RoomId { get; set; }
    }
}
