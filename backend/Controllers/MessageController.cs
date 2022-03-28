using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using simple_chatrooms_backend.Entities;
using simple_chatrooms_backend.Models.MessageDtos;
using simple_chatrooms_backend.Services.MessageRepository;
using simple_chatrooms_backend.Services.RoomRepository;
using simple_chatrooms_backend.Services.UserRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace simple_chatrooms_backend.Controllers {
    [Route("api/users/{userId}/rooms/{roomId}/messages")]
    [ApiController]
    public class MessageController : ControllerBase {

        private readonly IRoomRepository<Room> _roomRepository;
        private readonly IUserRepository<User> _userRepository;
        private readonly IMessageRepository<Message> _messageRepository;
        private readonly IMapper _mapper;

        public MessageController(IRoomRepository<Room> roomRepository,
                                    IUserRepository<User> userRepository,
                                    IMessageRepository<Message> messageRepository,
                                    IMapper mapper) {
            _roomRepository = roomRepository ?? throw new ArgumentNullException(nameof(roomRepository));
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            _messageRepository = messageRepository ?? throw new ArgumentNullException(nameof(messageRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpPatch]
        public ActionResult GetAll(Guid userId, Guid roomId, [FromBody] MessageGetAllDto dto) {
            Dictionary<Guid, IEnumerable<MessageDto>> returnDic = new Dictionary<Guid, IEnumerable<MessageDto>>();

            foreach (KeyValuePair<Guid, Guid?> roomKV in dto.RoomsWithLastMessageReceived) {
                if (!_roomRepository.Exists(roomKV.Key)) continue;
                if (roomKV.Value == null || (roomKV.Value != null && !_messageRepository.Exists((Guid)roomKV.Value)))
                    returnDic.Add(roomKV.Key, _mapper.Map<IEnumerable<MessageDto>>(_messageRepository.GetForRoom(roomKV.Key, null)));
                else
                    returnDic.Add(roomKV.Key, _mapper.Map<IEnumerable<MessageDto>>(_messageRepository.GetForRoom(roomKV.Key, roomKV.Value)));
            }

            return Ok(returnDic.ToArray());
        }

        [HttpPost]
        public ActionResult<MessageDto> Create(Guid userId, Guid roomId, MessageCreateDto dto) {
            if (!_userRepository.Exists(userId))
                return NotFound();

            if (!_roomRepository.Exists(roomId))
                return NotFound();


            var message = _mapper.Map<Message>(dto);

            message.RoomId = roomId;
            message.UserId = userId;
            message.SendDate = DateTime.Now;

            _messageRepository.Add(message);
            _messageRepository.Save();

            return Ok(_mapper.Map<MessageDto>(message));
        }
    }
}
