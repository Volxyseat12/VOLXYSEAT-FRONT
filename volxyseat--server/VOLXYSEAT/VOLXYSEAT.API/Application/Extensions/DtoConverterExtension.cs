using System.ComponentModel;
using VOLXYSEAT.API.Application.Models.Dtos.Transaction;
using VOLXYSEAT.DOMAIN.Models;

namespace VOLXYSEAT.API.Application.Extensions;

public static class DtoConverterExtension
{
    public static IEnumerable<TransactionDto> ToTransactionDto(this IEnumerable<Transaction> transactions)
    {
        return transactions.Select(transaction => transaction.ToTransactionDto());
    }

    public static TransactionDto ToTransactionDto(this Transaction transaction)
    {
        return new TransactionDto
        {
            SubscriptionId = transaction.SubscriptionId,
            ClientId = transaction.ClientId,
            MercadoPagoSubscriptionId = transaction.MercadoPagoSubscriptionId
        };
    }
}
