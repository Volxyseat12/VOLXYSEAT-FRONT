using Moq;
using VOLXYSEAT.API.Application.Commands.Subscription.Create;
using VOLXYSEAT.DOMAIN.Models;
using VOLXYSEAT.DOMAIN.Repositories;

namespace VOLXYSEAT.TESTS.Application.Commands
{
    public class SubscriptionCommandHandlerTest
    {
        private readonly CreateSubscriptionCommandHandler _handler;
        private readonly Mock<ISubscriptionRepository> _mockRepository;

        public SubscriptionCommandHandlerTest()
        {
            _mockRepository = new Mock<ISubscriptionRepository>();
            _handler = new CreateSubscriptionCommandHandler(_mockRepository.Object);
        }

        [Fact]
        public async Task Handle_ValidRequest_ReturnsTrue()
        {
            var command = MockDataLoader.LoadMockData<CreateSubscriptionCommand>(
                "CreateSubscriptionCommand",
                "Application/Resources/Mock/mock_subscription.json");

            _mockRepository.Setup(x => x.AddAsync(It.IsAny<Subscription>())).Returns(Task.CompletedTask);
            _mockRepository.Setup(x => x.UnitOfWork.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);

            var result = await _handler.Handle(command, CancellationToken.None);

            Assert.True(result);
            _mockRepository.Verify(x => x.AddAsync(It.IsAny<Subscription>()), Times.Once);
            _mockRepository.Verify(x => x.UnitOfWork.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
        }

        [Fact]
        public async Task Handle_InvalidRequest_ReturnsFalse()
        {
            var command = MockDataLoader.LoadMockData<CreateSubscriptionCommand>(
                "CreateSubscriptionCommand",
                "Application/Resources/Mock/mock_subscription.json");

            _mockRepository.Setup(x => x.AddAsync(It.IsAny<Subscription>())).Returns(Task.CompletedTask);
            _mockRepository.Setup(x => x.UnitOfWork.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(0);

            var result = await _handler.Handle(command, CancellationToken.None);

            Assert.False(result);
            _mockRepository.Verify(x => x.AddAsync(It.IsAny<Subscription>()), Times.Once);
            _mockRepository.Verify(x => x.UnitOfWork.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
        }
    }
}