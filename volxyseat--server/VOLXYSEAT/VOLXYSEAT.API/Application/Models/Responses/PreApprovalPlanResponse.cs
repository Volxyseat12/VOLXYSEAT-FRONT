namespace VOLXYSEAT.API.Application.Models.Responses;

public class PreApprovalPlanResponse
{
    public string Id { get; set; }
    public long ApplicationId { get; set; }
    public long CollectorId { get; set; }
    public string Reason { get; set; }
    public AutoRecurring AutoRecurring { get; set; }
    public PaymentMethodsAllowed PaymentMethodsAllowed { get; set; }
    public string BackUrl { get; set; }
    public string ExternalReference { get; set; }
    public string InitPoint { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime LastModified { get; set; }
    public string Status { get; set; }
}

public class AutoRecurring
{
    public int Frequency { get; set; }
    public string FrequencyType { get; set; }
    public int Repetitions { get; set; }
    public int BillingDay { get; set; }
    public bool BillingDayProportional { get; set; }
    public FreeTrial FreeTrial { get; set; }
    public decimal TransactionAmount { get; set; }
    public string CurrencyId { get; set; }
}

public class FreeTrial
{
    public int Frequency { get; set; }
    public string FrequencyType { get; set; }
}

public class PaymentMethodsAllowed
{
    public List<PaymentType> PaymentTypes { get; set; }
    public List<PaymentMethod> PaymentMethods { get; set; }
}

public class PaymentType
{
    public string Id { get; set; }
}

public class PaymentMethod
{
    public string Id { get; set; }
}
