using Microsoft.EntityFrameworkCore.Migrations;

namespace simple_chatrooms_backend.Migrations
{
    public partial class AddJoinStringtoRoom : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "JoinString",
                table: "Rooms",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "JoinString",
                table: "Rooms");
        }
    }
}
