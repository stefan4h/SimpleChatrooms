using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace simple_chatrooms_backend.Entities {
    public class RoomUser {

        [Required]
        public DateTime JoinDate { get; set; }

        public Guid RoomId { get; set; }
        public Room Room { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
