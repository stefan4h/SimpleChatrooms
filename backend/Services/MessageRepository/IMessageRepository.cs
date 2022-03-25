using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace simple_chatrooms_backend.Services.MessageRepository {
    public interface IMessageRepository<T> : IRepository<T> where T : class {
    }
}
