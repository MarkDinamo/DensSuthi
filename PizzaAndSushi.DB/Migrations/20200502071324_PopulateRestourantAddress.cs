using Microsoft.EntityFrameworkCore.Migrations;

namespace PizzaAndSushi.DB.Migrations
{
    public partial class PopulateRestourantAddress : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData("Restaurants", new string[] { "Id", "Address" },
                new object[] {
                    1,
                    "Rokossovs'koho St, 16А"
                });
            migrationBuilder.InsertData("Restaurants", new string[] { "Id", "Address" },
                new object[] {
                    2,
                    "Myru Ave, 30 А,"
                });
            migrationBuilder.InsertData("Restaurants", new string[] { "Id", "Address" },
                new object[] {
                    3,
                    "Kyrponosa St, 34"
                });
            migrationBuilder.InsertData("Restaurants", new string[] { "Id", "Address" },
                new object[] {
                    4,
                    "Rokossovs'koho St, 42А"
                });
            migrationBuilder.InsertData("Restaurants", new string[] { "Id", "Address" },
                new object[] {
                    5,
                    "Ivana Mazepy St, 55/3"
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
