using Moq;
using Volxyseat.API.Application.Queries.Subscription;
using VOLXYSEAT.API.Application.Models.Dtos.Subscription;
using VOLXYSEAT.DOMAIN.Models;
using VOLXYSEAT.DOMAIN.Repositories;
using System.Text.Json;
using System.Text.Json.Serialization;
using VOLXYSEAT.API.Application.Queries.Subscription;
using VOLXYSEAT.DOMAIN.Exceptions;

namespace VOLXYSEAT.TESTS.Application.Queries
{
    public class GetSubscriptionQueryHandlerTest
    {
        private readonly Mock<ISubscriptionRepository> _repositoryMock;
        private readonly GetSubscriptionQueryHandler _handler;

        public GetSubscriptionQueryHandlerTest()
        {
            _repositoryMock = new Mock<ISubscriptionRepository>();
            _handler = new GetSubscriptionQueryHandler(_repositoryMock.Object);
        }

        private T LoadMockData<T>(string key)
        {
            var json = File.ReadAllText("Application/Resources/Mock/mock_subscription.json");
            var options = new JsonSerializerOptions
            {
                Converters = { new JsonStringEnumConverter() },
                PropertyNameCaseInsensitive = true
            };
            var mockData = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(json, options);
            if (mockData.TryGetValue(key, out var element))
            {
                return JsonSerializer.Deserialize<T>(element.GetRawText(), options);
            }
            throw new KeyNotFoundException($"Key '{key}' not found in mock data.");
        }

        [Fact]
        public async Task Handle_ValidRequest_ReturnsSubscriptionDto()
        {
            var subscription = LoadMockData<Subscription>("CreateSubscriptionCommand");
            var subscriptionDto = new SubscriptionDto
            {
                Id = subscription.Id,
                Type = subscription.TypeId,
                Status = subscription.StatusId,
                Description = subscription.Description,
                Price = subscription.Price,
                CreatedOn = subscription.CreatedOn
            };

            _repositoryMock.Setup(x => x.GetByIdAsync(subscription.Id)).ReturnsAsync(subscription);

            var query = new GetSubscriptionQuery(subscription.Id);
            var result = await _handler.Handle(query, CancellationToken.None);

            Assert.Equal(subscriptionDto.Id, result.Id);
            Assert.Equal(subscriptionDto.Type, result.Type);
            Assert.Equal(subscriptionDto.Status, result.Status);
            Assert.Equal(subscriptionDto.Description, result.Description);
            Assert.Equal(subscriptionDto.Price, result.Price);
            Assert.Equal(subscriptionDto.CreatedOn, result.CreatedOn);
            Assert.Equal(subscriptionDto.UpdatedOn, result.UpdatedOn);
        }

        [Fact]
        public async Task Handle_InvalidRequest_ThrowsException()
        {
            var subscriptionId = Guid.NewGuid();

            _repositoryMock.Setup(x => x.GetByIdAsync(subscriptionId)).ReturnsAsync((Subscription)null);

            var query = new GetSubscriptionQuery(subscriptionId);

            var exception = await Assert.ThrowsAsync<VolxyseatDomainException>(() => _handler.Handle(query, CancellationToken.None));
            Assert.Equal("Subscription not found.", exception.Message);
        }

        [Fact]
        public async Task Handle_NullRequest_ThrowsException()
        {
            var query = new GetSubscriptionQuery(Guid.Empty);

            var exception = await Assert.ThrowsAsync<VolxyseatDomainException>(() => _handler.Handle(query, CancellationToken.None));
            Assert.Equal("Subscription not found.", exception.Message);
        }
    }
}
