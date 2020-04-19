using Microsoft.EntityFrameworkCore.Migrations;

namespace PizzaAndSushi.DB.Migrations
{
    public partial class AddProducts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData("Products", new string[] { "Id", "Name" , "Details", "Price", "Weight", "IsLiquid", "IsHidden", "ProductTypeId" }, 
                new object[] { 
                    1,
                    "CLASSICA",
                    "HAM, MUCHROOMS, MOZZARELLA, HERB TOMATO",
                    150,
                    400,
                    false,
                    false,
                    1
                });
  migrationBuilder.InsertData("Products", new string[] { "Id", "Name", "Details", "Price", "Weight", "IsLiquid", "IsHidden", "ProductTypeId" },
new object[] {
                    2,
                    "PROSCIUTTO E RUCOLA",
                    "MATURED HAM, GRANA PADANO CHEESE, CHERRY",
                    180,
                    420,
                    false,
                    false,
                    1
          });
            migrationBuilder.InsertData("Products", new string[] { "Id", "Name", "Details", "Price", "Weight", "IsLiquid", "IsHidden", "ProductTypeId" },
          new object[] {
                    3,
                    "PEPPERONI",
                    "PEPPERONI SAUSAGE, MOZZARELLA, HERB TOMATO",
                    160,
                    375,
                    false,
                    false,
                    1
          });
migrationBuilder.InsertData("Products", new string[] { "Id", "Name", "Details", "Price", "Weight", "IsLiquid", "IsHidden", "ProductTypeId" },
new object[] {
                    4,
                    "SUPER SUPREME",
                    "PEPPERONI, BEEF, SPICY PORK, HAM, ONION, GREEN PEPPER",
                    250,
                    450,
                    false,
                    false,
                    1
          });

  migrationBuilder.InsertData("Products", new string[] { "Id", "Name", "Details", "Price", "Weight", "IsLiquid", "IsHidden", "ProductTypeId" },
new object[] {
                    5,
                    "CAESAR",
                    "GRILLED CHICKEN BREAST FILLETS,  COS LETTUCE",
                    100,
                    450,
                    false,
                    false,
                    7
});

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
