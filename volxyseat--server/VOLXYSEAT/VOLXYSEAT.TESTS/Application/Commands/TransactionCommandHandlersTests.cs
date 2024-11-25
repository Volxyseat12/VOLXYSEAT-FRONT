using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VOLXYSEAT.API.Application.Commands.Transaction.Create;
using VOLXYSEAT.API.Application.Commands.Transaction.Disable;
using VOLXYSEAT.API.Application.Models.Dtos.Transaction;
using VOLXYSEAT.DOMAIN.Exceptions;
using VOLXYSEAT.DOMAIN.Repositories;

namespace VOLXYSEAT.TESTS.Application.Commands;
public class TransactionCommandHandlersTests
{
    private readonly Mock<ITransactionRepository> _repositoryMock;
    private readonly CreateTransactionCommandHandler _createHandler;
    private readonly DisableTransactionHandler _disableHandler;

    public TransactionCommandHandlersTests()
    {
        _repositoryMock = new Mock<ITransactionRepository>();
        _createHandler = new CreateTransactionCommandHandler(_repositoryMock.Object);
        _disableHandler = new DisableTransactionHandler(_repositoryMock.Object);
    }

    #region CreateTransactionCommandHandler Tests

    [Fact]
    public async Task Handle_ShouldReturnTransactionDto_WhenTransactionIsCreatedSuccessfully()
    {
        // Arrange
        var command = new CreateTransactionCommand(
            ClientId: Guid.NewGuid(),
            SubscriptionId: Guid.NewGuid(),
            MercadoPagoSubscriptionId: "newMercadoPagoSubscriptionId"
        );

        var transaction = new DOMAIN.Models.Transaction(command.SubscriptionId, command.ClientId, command.MercadoPagoSubscriptionId);

        _repositoryMock.Setup(r => r.AddAsync(It.IsAny<DOMAIN.Models.Transaction>())).Returns(Task.CompletedTask);
        _repositoryMock.Setup(r => r.UnitOfWork.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);

        // Act
        var result = await _createHandler.Handle(command, CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        Assert.IsType<TransactionDto>(result);
        Assert.Equal(command.SubscriptionId, result.SubscriptionId);
        Assert.Equal(command.ClientId, result.ClientId);
        Assert.Equal(command.MercadoPagoSubscriptionId, result.MercadoPagoSubscriptionId);

        _repositoryMock.Verify(r => r.AddAsync(It.IsAny<DOMAIN.Models.Transaction>()), Times.Once);
        _repositoryMock.Verify(r => r.UnitOfWork.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Handle_ShouldThrowException_WhenRequestIsNull()
    {
        // Arrange
        CreateTransactionCommand command = null;

        // Act & Assert
        await Assert.ThrowsAsync<VolxyseatDomainException>(() => _createHandler.Handle(command, CancellationToken.None));
    }

    #endregion

    #region DisableTransactionHandler Tests

    [Fact]
    public async Task Handle_ShouldReturnTrue_WhenTransactionIsDisabledSuccessfully()
    {
        // Arrange
        var clientId = Guid.NewGuid();
        var transaction = new DOMAIN.Models.Transaction(Guid.NewGuid(), clientId, "MercadoPagoId")
        {
            Id = Guid.NewGuid()
        };

        _repositoryMock.Setup(r => r.GetByClientId(clientId)).ReturnsAsync(transaction);
        _repositoryMock.Setup(r => r.UnitOfWork.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);

        // Act
        var result = await _disableHandler.Handle(new DisableTransactionCommand(clientId), CancellationToken.None);

        // Assert
        Assert.True(result);
        _repositoryMock.Verify(r => r.DisableTransaction(It.IsAny<DOMAIN.Models.Transaction>()), Times.Once);
        _repositoryMock.Verify(r => r.UnitOfWork.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Handle_ShouldReturnFalse_WhenTransactionDoesNotExist()
    {
        // Arrange
        var clientId = Guid.NewGuid();
        _repositoryMock.Setup(r => r.GetByClientId(clientId)).ReturnsAsync((DOMAIN.Models.Transaction)null);

        // Act
        var result = await _disableHandler.Handle(new DisableTransactionCommand(clientId), CancellationToken.None);

        // Assert
        Assert.False(result);
        _repositoryMock.Verify(r => r.DisableTransaction(It.IsAny<DOMAIN.Models.Transaction>()), Times.Never);
        _repositoryMock.Verify(r => r.UnitOfWork.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Never);
    }

    #endregion
}