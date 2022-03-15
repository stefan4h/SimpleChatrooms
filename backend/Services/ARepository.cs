using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace simple_chatrooms_backend.Services {
    public abstract class ARepository<T> : IRepository<T> where T : class {

        protected readonly SimpleChatroomsContext _context;
        public ARepository(SimpleChatroomsContext context) {
            _context = context;
        }

        public void Add(T entity) {
            _context.Set<T>().Add(entity);
        }

        public void AddRange(IEnumerable<T> entities) {
            _context.Set<T>().AddRange(entities);
        }

        public IEnumerable<T> GetAll() {
            return _context.Set<T>().ToList();
        }

        public T GetOne(Guid id) {
            return _context.Set<T>().Find(id);
        }

        public void Remove(T entity) {
            _context.Set<T>().Remove(entity);
        }

        public void RemoveRange(IEnumerable<T> entities) {
            _context.Set<T>().RemoveRange(entities);
        }

        public bool Save() {
            return (_context.SaveChanges() >= 0);
        }

        public void Update(T entity) {
            _context.Set<T>().Update(entity);
        }

        public bool Exists(Guid id) {
            return _context.Set<T>().Find(id) != null;
        }
    }
}
