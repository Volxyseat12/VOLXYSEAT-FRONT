using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VOLXYSEAT.API.Application.Commands.Subscription.Create;
using VOLXYSEAT.API.Application.Commands.Subscription.Update;
using VOLXYSEAT.API.Application.Models.Dtos.Subscription;
using VOLXYSEAT.API.Application.Models.Requests.Subscription;
using VOLXYSEAT.DOMAIN.Exceptions;
using VOLXYSEAT.DOMAIN.Models;
using VOLXYSEAT.DOMAIN.Repositories;

namespace VOLXYSEAT.TESTS.Application.Commands;
public class SubscriptionCommandHandlerTests
{
    private readonly Mock<ISubscriptionRepository> _repositoryMock;
    private readonly CreateSubscriptionCommandHandler _createHandler;
    private readonly UpdateSubscriptionCommandHandler _updateHandler;

    public SubscriptionCommandHandlerTests()
    {
        _repositoryMock = new Mock<ISubscriptionRepository>();
        _createHandler = new CreateSubscriptionCommandHandler(_repositoryMock.Object);
        _updateHandler = new UpdateSubscriptionCommandHandler(_repositoryMock.Object);
    }

    #region CreateSubscriptionCommandHandler Tests

    [Fact]
    public async Task CreateSubscriptionCommandHandler_ShouldReturnTrue_WhenValidRequest()
    {
        var repositoryMock = new Mock<ISubscriptionRepository>();
        var handler = new CreateSubscriptionCommandHandler(repositoryMock.Object);

        var createCommand = new CreateSubscriptionCommand(
            new SubscriptionRequest
            {
                TypeId = SubscriptionEnum.Advanced,
                StatusId = SubscriptionStatus.Active,
                Description = "Premium Plan",
                Price = 99.99M,
                MercadoPagoPlanId = "1234-5678-91011",
                SubscriptionProperties = new SubscriptionPropertiesDto
                {
                    Support = true,
                    Phone = true,
                    Email = true
                }
            }
        );

        repositoryMock.Setup(r => r.AddAsync(It.IsAny<Subscription>())).Returns(Task.CompletedTask);
        repositoryMock.Setup(r => r.UnitOfWork.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);

        var result = await handler.Handle(createCommand, CancellationToken.None);

        Assert.True(result);
        repositoryMock.Verify(r => r.AddAsync(It.IsAny<Subscription>()), Times.Once);
        repositoryMock.Verify(r => r.UnitOfWork.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }


    [Fact]
    public async Task CreateHandle_ShouldThrowException_WhenCommandIsNull()
    {
        await Assert.ThrowsAsync<VolxyseatDomainException>(() => _createHandler.Handle(null, CancellationToken.None));
    }

    [Fact]
    public void CreateConstructor_ShouldThrowException_WhenRepositoryIsNull()
    {
        Assert.Throws<VolxyseatDomainException>(() => new CreateSubscriptionCommandHandler(null));
    }

    #endregion

    #region UpdateSubscriptionCommandHandler Tests

    [Fact]
    public async Task UpdateHandle_ShouldReturnTrue_WhenSubscriptionIsUpdatedSuccessfully()
    {
        var existingSubscription = new Subscription(SubscriptionEnum.Advanced, SubscriptionStatus.Active, "Old Subscription", 50, "oldMercadoPagoPlanId");
        var command = new UpdateSubscriptionCommand
        (
            existingSubscription.Id,
            new SubscriptionRequest
            {
                TypeId = SubscriptionEnum.Advanced,
                StatusId = SubscriptionStatus.Active,
                Description = "Updated Subscription",
                Price = 100,
                MercadoPagoPlanId = "newMercadoPagoPlanId",
                SubscriptionProperties = new SubscriptionPropertiesDto
                {
                    Support = true,
                    Phone = true,
                    Email = true
                }
            }
        );

        _repositoryMock.Setup(r => r.GetByIdAsync(It.IsAny<Guid>())).ReturnsAsync(existingSubscription);
        _repositoryMock.Setup(r => r.Update(It.IsAny<Subscription>())).Returns(Task.CompletedTask);
        _repositoryMock.Setup(r => r.UnitOfWork.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);

        var result = await _updateHandler.Handle(command, CancellationToken.None);

        Assert.True(result);
        _repositoryMock.Verify(r => r.Update(It.IsAny<Subscription>()), Times.Once);
        _repositoryMock.Verify(r => r.UnitOfWork.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task UpdateHandle_ShouldThrowException_WhenCommandIsNull()
    {
        await Assert.ThrowsAsync<VolxyseatDomainException>(() => _updateHandler.Handle(null, CancellationToken.None));
    }

    [Fact]
    public async Task UpdateHandle_ShouldThrowException_WhenSubscriptionIsNotFound()
    {
        var command = new UpdateSubscriptionCommand
        (
            Guid.NewGuid(),
            new SubscriptionRequest
            {
                TypeId = SubscriptionEnum.Advanced,
                StatusId = SubscriptionStatus.Active,
                Description = "Updated Subscription",
                Price = 100,
                MercadoPagoPlanId = "newMercadoPagoPlanId",
                SubscriptionProperties = new SubscriptionPropertiesDto
                {
                    Support = true,
                    Phone = true,
                    Email = true
                }
            }
        );

        _repositoryMock.Setup(r => r.GetByIdAsync(It.IsAny<Guid>())).ReturnsAsync((Subscription)null);

        await Assert.ThrowsAsync<VolxyseatDomainException>(() => _updateHandler.Handle(command, CancellationToken.None));
    }

    #endregion
}