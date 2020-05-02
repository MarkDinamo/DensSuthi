using Microsoft.EntityFrameworkCore.Migrations;

namespace PizzaAndSushi.DB.Migrations
{
    public partial class AddOrderStatuses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData("OrderStatuses", new string[] { "Id", "Name" },
               new object[] {
                    1,
                    "Created"
               });
            migrationBuilder.InsertData("OrderStatuses", new string[] { "Id", "Name" },
               new object[] {
                    2,
                    "Preparing"
               });
            migrationBuilder.InsertData("OrderStatuses", new string[] { "Id", "Name" },
               new object[] {
                    3,
                    "Delivering"
               });
            migrationBuilder.InsertData("OrderStatuses", new string[] { "Id", "Name" },
               new object[] {
                    4,
                    "Rejected"
               });
            migrationBuilder.InsertData("OrderStatuses", new string[] { "Id", "Name" },
               new object[] {
                    5,
                    "Waiting for collect"
               });
            migrationBuilder.InsertData("OrderStatuses", new string[] { "Id", "Name" },
               new object[] {
                    6,
                    "Resolved"
               });
            migrationBuilder.InsertData("OrderStatuses", new string[] { "Id", "Name" },
               new object[] {
                    7,
                    "Confirmed"
               });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
