using simple_chatrooms_backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace simple_chatrooms_backend.Services {
    public class UserRepository : ARepository<User>, IUserRepository<User> {
        public UserRepository(SimpleChatroomsContext context) : base(context) {

        }
    }
}
