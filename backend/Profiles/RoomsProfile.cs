using AutoMapper;
using simple_chatrooms_backend.Models.RoomDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace simple_chatrooms_backend.Profiles {
    public class RoomsProfile : Profile {

        public RoomsProfile() {
            CreateMap<Entities.Room, RoomDto>();
            CreateMap<RoomCreateDto, Entities.Room>();
        }
    }
}
