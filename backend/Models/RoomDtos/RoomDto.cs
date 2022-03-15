using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using simple_chatrooms_backend.Entities;
using simple_chatrooms_backend.Models.UserDtos;

namespace simple_chatrooms_backend.Models.RoomDtos {
    public class RoomDto {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string JoinString { get; set; }
        public string Picture { get; set; }
        public ICollection<UserDto> Users { get; set; }
    }
}
