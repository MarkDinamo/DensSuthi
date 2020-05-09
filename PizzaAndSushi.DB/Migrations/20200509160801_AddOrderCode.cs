using Microsoft.EntityFrameworkCore.Migrations;

namespace PizzaAndSushi.DB.Migrations
{
    public partial class AddOrderCode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Code",
                table: "Orders",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "Orders");
        }
    }
}
