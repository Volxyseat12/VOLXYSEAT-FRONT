using FluentValidation;
using VOLXYSEAT.DOMAIN.Repositories;

namespace VOLXYSEAT.API.Application.Commands.Subscription.Create
{
    public class CreateSubscriptionCommandValidator : AbstractValidator<CreateSubscriptionCommand>
    {
        public CreateSubscriptionCommandValidator(ISubscriptionRepository repository)
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
