using Microsoft.EntityFrameworkCore;
using simple_chatrooms_backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace simple_chatrooms_backend {
    public class SimpleChatroomsContext : DbContext {

        public SimpleChatroomsContext(DbContextOptions<SimpleChatroomsContext> options) : base(options) {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {

            modelBuilder.Entity<User>().HasData(new User {
                Id = Guid.NewGuid(),
                Username = "the_cena",
                FirstName = "John",
                LastName = "Cena"
            });

            base.OnModelCreating(modelBuilder);
        }

    }
}
