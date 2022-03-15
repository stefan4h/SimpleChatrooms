using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace simple_chatrooms_backend.Models.RoomDtos {
    public class RoomCreateDto {
        public string Name { get; set; }
        public string Description { get; set; }
        public string JoinString { get; set; }
    }
}
