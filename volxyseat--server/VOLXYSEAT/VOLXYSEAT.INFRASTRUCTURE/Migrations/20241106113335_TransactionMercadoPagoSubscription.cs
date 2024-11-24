using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VOLXYSEAT.INFRASTRUCTURE.Migrations
{
    /// <inheritdoc />
    public partial class TransactionMercadoPagoSubscription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MercadoPagoSubscriptionId",
                table: "Transactions",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MercadoPagoSubscriptionId",
                table: "Transactions");
        }
    }
}
