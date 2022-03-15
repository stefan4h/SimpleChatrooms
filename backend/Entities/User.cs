using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace simple_chatrooms_backend.Entities {
    public class User {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Username { get; set; }

        [Required]
        public byte[] PasswordHash { get; set; }

        [Required]
        public byte[] PasswordSalt { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }


        public string ProfilePicture { get; set; }

        [NotMapped]
        public IFormFile ProfilePictureFile { get; set; }

        [JsonIgnore]
        [IgnoreDataMember]
        public ICollection<Room> Rooms { get; set; }

        [JsonIgnore]
        [IgnoreDataMember]
        public List<RoomUser> RoomUsers { get; set; }
    }
}
