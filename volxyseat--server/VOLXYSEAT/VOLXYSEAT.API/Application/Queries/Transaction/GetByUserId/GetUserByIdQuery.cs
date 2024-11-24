using MediatR;
using VOLXYSEAT.API.Application.Models.Dtos.Transaction;

namespace VOLXYSEAT.API.Application.Queries.Transaction.GetByUserId;

public record GetUserByIdQuery(Guid Id) : IRequest<DOMAIN.Models.Transaction>;
