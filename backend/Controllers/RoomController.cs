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
using System.IO;
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

        [HttpGet("{roomId}")]
        public ActionResult<RoomDto> GetOne(Guid userId, Guid roomId) {
            if (!_userRepository.Exists(userId))
                return NotFound();

            if (!_roomRepository.Exists(roomId))
                return NotFound();

            var room = _roomRepository.GetOneWithUsers(roomId);

            return Ok(_mapper.Map<RoomDto>(room));
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

        [HttpPatch("{roomId}/remove")]
        public ActionResult Remove(Guid userId, Guid roomId) {
            if (!_userRepository.Exists(userId))
                return NotFound();

            if (!_roomRepository.Exists(roomId))
                return NotFound();

            _userRepository.RemoveRoom(userId, roomId);
            _userRepository.Save();

            return Ok();
        }

        [HttpPost("{roomId}/set-profile-picture")]
        public ActionResult<RoomDto> SetProfilePicture(Guid userId, Guid roomId, [FromForm] IFormFile image) {
            var room = _roomRepository.GetOne(roomId);
            try {
                string path = "Images\\";
                string fileName = Guid.NewGuid().ToString() + System.IO.Path.GetExtension(image.FileName);

                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);

                if (room.Picture != null && System.IO.File.Exists(path + room.Picture))
                    System.IO.File.Delete(path + room.Picture);

                using (FileStream fileStream = System.IO.File.Create(path + fileName)) {
                    image.CopyTo(fileStream);
                    fileStream.Flush();
                    room.Picture = fileName;
                    _roomRepository.Update(room);
                    _roomRepository.Save();
                    return Ok(_mapper.Map<RoomDto>(room));
                }

            } catch (Exception ex) {
                return StatusCode(500);
            }
        }

        [HttpPost("{roomId}/remove-profile-picture")]
        public ActionResult<RoomDto> RemoveProfilePicture(Guid userId, Guid roomId) {
            var room = _roomRepository.GetOne(roomId);
            try {
                string path = "Images\\";

                if (room.Picture != null && System.IO.File.Exists(path + room.Picture))
                    System.IO.File.Delete(path + room.Picture);

                room.Picture = null;
                _roomRepository.Update(room);
                _roomRepository.Save();
                return Ok(_mapper.Map<RoomDto>(room));

            } catch (Exception ex) {
                return StatusCode(500);
            }
        }
    }
}
