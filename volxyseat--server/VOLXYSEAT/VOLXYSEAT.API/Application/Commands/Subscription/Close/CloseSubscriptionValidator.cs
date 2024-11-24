using FluentValidation;
using VOLXYSEAT.DOMAIN.Repositories;

namespace VOLXYSEAT.API.Application.Commands.Subscription.Close
{
    public class CloseSubscriptionValidator : AbstractValidator<CloseSubscriptionCommand>
    {
        private readonly ISubscriptionRepository _repository;
        public CloseSubscriptionValidator(ISubscriptionRepository repository)
        {
            _repository = repository;

            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("Id is required")
                .Must(ToExist).WithMessage("Subscription does not exist");

            RuleFor(x => x.Comment)
                .NotEmpty().WithMessage("Comment is required")
                .MaximumLength(255).WithMessage("Comment must be less than 255 characters");
        }

        private bool ToExist(Guid id)
        {
            var result = _repository.GetByIdAsync(id);
            if (result == null)
                return false;

            return true;
        }
    }
}
