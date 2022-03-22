using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using simple_chatrooms_backend.Entities;
using simple_chatrooms_backend.Models.RoomDtos;
using simple_chatrooms_backend.Services.RoomRepository;
using simple_chatrooms_backend.Services.UserRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace simple_chatrooms_backend.Controllers {

    [Authorize]
    [Route("api/users/{userId}/rooms")]
    [ApiController]
    public class RoomController : ControllerBase {

        private readonly IRoomRepository<Room> _roomRepository;
        private readonly IUserRepository<User> _userRepository;
        private readonly IMapper _mapper;

        public RoomController(IRoomRepository<Room> roomRepository, IUserRepository<User> userRepository, IMapper mapper) {
            _roomRepository = roomRepository ?? throw new ArgumentNullException(nameof(roomRepository));
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet]
        public ActionResult<IEnumerable<RoomDto>> GetAll(Guid userId) {
            if (!_userRepository.Exists(userId))
                return NotFound();

            var rooms = _roomRepository.GetByUser(userId);

            return Ok(_mapper.Map<IEnumerable<RoomDto>>(rooms));
        }

        [HttpPost]
        public ActionResult<RoomDto> Create(Guid userId, RoomCreateDto dto) {
            if (!_userRepository.Exists(userId))
                return NotFound();

            if (_roomRepository.GetByJoinString(dto.JoinString) != null)
                return BadRequest("A Room with that JoinString already exists");

            var room = _mapper.Map<Room>(dto);

            _roomRepository.Add(room);
            _roomRepository.Save();

            _userRepository.AddRoom(userId, room);
            _roomRepository.Save();

            return Ok(_mapper.Map<RoomDto>(room));
        }
    }
}
