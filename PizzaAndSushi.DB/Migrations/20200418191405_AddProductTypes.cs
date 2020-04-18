using Microsoft.EntityFrameworkCore.Migrations;

namespace PizzaAndSushi.DB.Migrations
{
    public partial class AddProductTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData("ProductTypes", new string[] { "Id", "Name" }, new object[] { 1, "Pizza" });
            migrationBuilder.InsertData("ProductTypes", new string[] { "Id", "Name" }, new object[] { 2, "Soup" });
            migrationBuilder.InsertData("ProductTypes", new string[] { "Id", "Name" }, new object[] { 3, "Pasta" });
            migrationBuilder.InsertData("ProductTypes", new string[] { "Id", "Name" }, new object[] { 4, "Desert" });
            migrationBuilder.InsertData("ProductTypes", new string[] { "Id", "Name" }, new object[] { 5, "Alcohol Drink" });
            migrationBuilder.InsertData("ProductTypes", new string[] { "Id", "Name" }, new object[] { 6, "Non Alcohol Drink" });
            migrationBuilder.InsertData("ProductTypes", new string[] { "Id", "Name" }, new object[] { 7, "Salad" });
            migrationBuilder.InsertData("ProductTypes", new string[] { "Id", "Name" }, new object[] { 8, "Sushi" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
