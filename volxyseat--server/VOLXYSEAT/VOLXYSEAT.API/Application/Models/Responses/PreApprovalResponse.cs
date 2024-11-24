namespace VOLXYSEAT.API.Application.Models.Responses;

public class PreApprovalResponse
{
    public string Id { get; set; }
    public int Version { get; set; }
    public long ApplicationId { get; set; }
    public long CollectorId { get; set; }
    public string PreApprovalPlanId { get; set; }
    public string Reason { get; set; }
    public long ExternalReference { get; set; }
    public string BackUrl { get; set; }
    public string InitPoint { get; set; }
    public AutoRecurring AutoRecurring { get; set; }
    public long PayerId { get; set; }
    public long CardId { get; set; }
    public long PaymentMethodId { get; set; }
    public DateTime NextPaymentDate { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime LastModified { get; set; }
    public string Status { get; set; }
}
