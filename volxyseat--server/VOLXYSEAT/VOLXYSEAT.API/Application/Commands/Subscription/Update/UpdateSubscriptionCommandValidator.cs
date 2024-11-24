using FluentValidation;
using VOLXYSEAT.DOMAIN.Repositories;

namespace VOLXYSEAT.API.Application.Commands.Subscription.Update
{
    public class UpdateSubscriptionCommandValidator: AbstractValidator<UpdateSubscriptionCommand>
    {
        public UpdateSubscriptionCommandValidator(ISubscriptionRepository repository)
        {

            RuleFor(x => x.Subscription.TypeId)
                .IsInEnum().WithMessage("Invalid TypeId");

            RuleFor(x => x.Subscription.StatusId)
                .IsInEnum().WithMessage("Invalid StatusId");

            RuleFor(x => x.Subscription.Description)
                .NotEmpty().WithMessage("Description is required")
                .MaximumLength(255).WithMessage("Description must be less than 255 characters");

            RuleFor(x => x.Subscription.Price)
                .GreaterThan(0).WithMessage("Price must be greater than zero");
        }
    }
}
