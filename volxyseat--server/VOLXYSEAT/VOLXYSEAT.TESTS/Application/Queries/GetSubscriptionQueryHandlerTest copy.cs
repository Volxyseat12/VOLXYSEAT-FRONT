using Moq;
using Volxyseat.API.Application.Queries.Subscription;
using VOLXYSEAT.API.Application.Models.Dtos.Subscription;
using VOLXYSEAT.DOMAIN.Models;
using VOLXYSEAT.DOMAIN.Repositories;
using VOLXYSEAT.DOMAIN.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using VOLXYSEAT.API.Application.Queries.Subscription;

namespace VOLXYSEAT.TESTS.Application.Queries
{
    public class SubscriptionQueryHandlersTests
    {
        private readonly Mock<ISubscriptionRepository> _repositoryMock;
        private readonly GetAllSubscriptionHandler _getAllHandler;
        private readonly GetSubscriptionQueryHandler _getHandler;

        public SubscriptionQueryHandlersTests()
        {
            _repositoryMock = new Mock<ISubscriptionRepository>();
            _getAllHandler = new GetAllSubscriptionHandler(_repositoryMock.Object);
            _getHandler = new GetSubscriptionQueryHandler(_repositoryMock.Object);
        }

        #region GetAllSubscriptionHandler Tests

        [Fact]
        public async Task Handle_ShouldReturnListOfSubscriptions_WhenSubscriptionsExist()
        {
            // Arrange
            var subscriptions = new List<Subscription>
            {
                new Subscription(SubscriptionEnum.Basic, SubscriptionStatus.Active, "Basic", 100, "MP12345"),
                new Subscription(SubscriptionEnum.Advanced, SubscriptionStatus.Active, "Premium", 200, "MP67890")
            };

            _repositoryMock.Setup(r => r.GetAllAsync()).ReturnsAsync(subscriptions);

            // Act
            var result = await _getAllHandler.Handle(new GetAllSubscriptionQuery(), CancellationToken.None);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<List<SubscriptionDto>>(result);
            Assert.Equal(subscriptions.Count, result.Count());
            _repositoryMock.Verify(r => r.GetAllAsync(), Times.Once);
        }

        [Fact]
        public async Task Handle_ShouldThrowException_WhenNoSubscriptionsExist()
        {
            // Arrange
            _repositoryMock.Setup(r => r.GetAllAsync()).ReturnsAsync((List<Subscription>)null);

            // Act & Assert
            var exception = await Assert.ThrowsAsync<VolxyseatDomainException>(() => _getAllHandler.Handle(new GetAllSubscriptionQuery(), CancellationToken.None));
            Assert.Equal("No subscriptions found.", exception.Message);
        }

        #endregion

        #region GetSubscriptionQueryHandler Tests

        [Fact]
        public async Task Handle_ShouldReturnSubscriptionDto_WhenSubscriptionExists()
        {
            // Arrange
            var subscriptionId = Guid.Parse("1eb3032f-0b1c-4857-bae1-0385145979c5");
            var subscriptionProperties = new SubscriptionProperties(
                subscriptionId,
                support: true,
                phone: true,
                email: true,
                messenger: true,
                chat: true,
                liveSupport: true,
                documentation: true,
                onboarding: true,
                training: true,
                updates: true,
                backup: true,
                customization: true,
                analytics: true,
                integration: true,
                apiAccess: true,
                cloudStorage: true,
                multiUser: true,
                prioritySupport: true,
                sla: true,
                serviceLevel: true
            );

            var subscription = new Subscription(
                SubscriptionEnum.Basic,
                SubscriptionStatus.Active,
                "Basic Subscription",
                100,
                "MP12345"
            )
            {
                SubscriptionProperties = subscriptionProperties
            };

            subscription.Id = subscriptionId;

            _repositoryMock.Setup(r => r.GetByIdAsync(subscriptionId)).ReturnsAsync(subscription);

            // Act
            var result = await _getHandler.Handle(new GetSubscriptionQuery(subscriptionId), CancellationToken.None);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(subscriptionId, result.Id); // Agora deve passar
            Assert.Equal("Basic Subscription", result.Description);
            Assert.Equal(100, result.Price);
            Assert.NotNull(result.SubscriptionProperties);
            Assert.True(result.SubscriptionProperties.Support);
            Assert.True(result.SubscriptionProperties.Phone);
            Assert.True(result.SubscriptionProperties.Email);
            Assert.True(result.SubscriptionProperties.Messenger);
            Assert.True(result.SubscriptionProperties.Chat);
            Assert.True(result.SubscriptionProperties.LiveSupport);
            Assert.True(result.SubscriptionProperties.Documentation);
            Assert.True(result.SubscriptionProperties.Onboarding);
            Assert.True(result.SubscriptionProperties.Training);
            Assert.True(result.SubscriptionProperties.Updates);
            Assert.True(result.SubscriptionProperties.Backup);
            Assert.True(result.SubscriptionProperties.Customization);
            Assert.True(result.SubscriptionProperties.Analytics);
            Assert.True(result.SubscriptionProperties.Integration);
            Assert.True(result.SubscriptionProperties.APIAccess);
            Assert.True(result.SubscriptionProperties.CloudStorage);
            Assert.True(result.SubscriptionProperties.MultiUser);
            Assert.True(result.SubscriptionProperties.PrioritySupport);
            Assert.True(result.SubscriptionProperties.SLA);
            Assert.True(result.SubscriptionProperties.ServiceLevel);
            _repositoryMock.Verify(r => r.GetByIdAsync(subscriptionId), Times.Once);
        }


        [Fact]
        public async Task Handle_ShouldThrowException_WhenSubscriptionDoesNotExist()
        {
            // Arrange
            var subscriptionId = Guid.NewGuid();
            _repositoryMock.Setup(r => r.GetByIdAsync(subscriptionId)).ReturnsAsync((Subscription)null);

            // Act & Assert
            var exception = await Assert.ThrowsAsync<VolxyseatDomainException>(() => _getHandler.Handle(new GetSubscriptionQuery(subscriptionId), CancellationToken.None));
            Assert.Equal("Subscription not found.", exception.Message);
        }

        #endregion
    }
}
