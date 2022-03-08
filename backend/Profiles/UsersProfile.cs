using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using System.Threading.Tasks;
using simple_chatrooms_backend.Services;

namespace simple_chatrooms_backend.Profiles {
    public class UsersProfile : Profile {

        public UsersProfile() {
            CreateMap<Entities.User, Models.UserDto>();
            CreateMap<Entities.User, Models.UserAuthDto>();
        }
    }
}
