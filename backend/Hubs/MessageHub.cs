using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using simple_chatrooms_backend.Entities;
using simple_chatrooms_backend.Services.UserRepository;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace simple_chatrooms_backend.Hubs
{
    public class MessageHub : Hub
    {

        private readonly IUserRepository<User> _userRepository;

        public MessageHub(IUserRepository<User> userRepository)
        {
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }

        public override Task OnConnectedAsync()
        {
            var user = _userRepository.GetOneByUsername(Context.User.Claims.First(c => c.Type == ClaimTypes.Name).Value);

            foreach(var room in user.Rooms)
            {
                AddToGroup(room.Id.ToString()).Wait();
            }

            return base.OnConnectedAsync();
        }

        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }
    }
}
