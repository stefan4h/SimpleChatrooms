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
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {

            modelBuilder.Entity<Room>()
    .HasMany(r => r.Users)
    .WithMany(u => u.Rooms)
    .UsingEntity<RoomUser>(
        j => j
            .HasOne(ru => ru.User)
            .WithMany(u => u.RoomUsers)
            .HasForeignKey(ru => ru.UserId),
        j => j
            .HasOne(ru => ru.Room)
            .WithMany(r => r.RoomUsers)
            .HasForeignKey(ru => ru.RoomId),
        j => {
            j.Property(ru => ru.JoinDate).HasDefaultValueSql("CURRENT_TIMESTAMP");
            j.HasKey(u => new { u.RoomId, u.UserId });
        });

            base.OnModelCreating(modelBuilder);
        }

    }
}
