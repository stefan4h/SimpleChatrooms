using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using System.Threading.Tasks;
using simple_chatrooms_backend.Services;
using simple_chatrooms_backend.Models.User;

namespace simple_chatrooms_backend.Profiles {
    public class UsersProfile : Profile {

        public UsersProfile() {
            CreateMap<Entities.User, UserDto>();
            CreateMap<Entities.User, UserAuthDto>();
        }
    }
}
