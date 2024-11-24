namespace VOLXYSEAT.API.Application.Request
{
    public class SubscriptionChangeStatusWithCommentRequest
    {
        public SubscriptionChangeStatusWithCommentRequest(string comment)
        {
            Comment = comment;
        }
        public string Comment { get; set; }
    }
}
