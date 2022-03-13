using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using simple_chatrooms_backend.Entities;
using simple_chatrooms_backend.Models.User;
using simple_chatrooms_backend.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace simple_chatrooms_backend.Controllers {

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase {
        private readonly SimpleChatroomsContext _context;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AuthController(SimpleChatroomsContext context,ITokenService tokenService, IMapper mapper) {
            _context = context;
            _tokenService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserAuthDto>> Register(UserRegisterDto dto) {
            if (await UserExists(dto.Username)) return BadRequest("UserName Is Already Taken");
            var hmac = new HMACSHA512();

            var user = new User {
                Username = dto.Username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.Password)),
                PasswordSalt = hmac.Key,
                FirstName = dto.FirstName,
                LastName = dto.LastName
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var userDto = _mapper.Map<UserAuthDto>(user);
            userDto.Token = _tokenService.CreateToken(user);

            return Ok(userDto);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserAuthDto>> Login(UserLoginDto dto) {
            var user = await _context.Users
                .SingleOrDefaultAsync(x => x.Username == dto.Username);

            if (user == null) return Unauthorized("Invalid UserName or Password");

            var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.Password));

            for (int i = 0; i < computedHash.Length; i++) {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid UserName or Password");
            }

            var userDto = _mapper.Map<UserAuthDto>(user);
            userDto.Token = _tokenService.CreateToken(user);

            return Ok(userDto);
        }

        private async Task<bool> UserExists(string username) {
            return await _context.Users.AnyAsync(x => x.Username == username.ToLower());
        }

    }
}
