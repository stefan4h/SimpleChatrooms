using AutoMapper;
using simple_chatrooms_backend.Models.MessageDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace simple_chatrooms_backend.Profiles {
    public class MessagesProfile : Profile {
        public MessagesProfile() {
            CreateMap<Entities.Message, MessageDto>();
            CreateMap<MessageCreateDto, Entities.Message>();
        }
    }
}
