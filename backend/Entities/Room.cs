using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace simple_chatrooms_backend.Entities {
    public class Room {

        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public string Picture { get; set; }

        [NotMapped]
        public IFormFile PictureFile { get; set; }

        public ICollection<User> Users { get; set; }
        public List<RoomUser> RoomUsers { get; set; }
    }
}
