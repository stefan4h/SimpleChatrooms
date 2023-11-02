using simple_chatrooms_backend.Entities;
using simple_chatrooms_backend.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace simple_chatrooms_backend.Repositories.MessageRepository
{
    public interface IMessageRepository<T> : IRepository<T> where T : class
    {

        public IEnumerable<Message> GetForRoom(Guid roomId, Guid? lastMessagedRecievedId);

    }
}
