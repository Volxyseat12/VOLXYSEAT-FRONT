using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using System.Text.Json;
using System.Text.Json.Serialization;
using Volxyseat.API.Application.Queries.Subscription;
using VOLXYSEAT.API.Application.Commands.Subscription.Close;
using VOLXYSEAT.API.Application.Commands.Subscription.Create;
using VOLXYSEAT.API.Application.Models.Dtos.Subscription;
using VOLXYSEAT.API.Application.Request;
using VOLXYSEAT.API.Controllers;
using Xunit;

namespace VOLXYSEAT.TESTS.Application
{
    public class SubscriptionControllerTest
    {
        private readonly Mock<IMediator> _mediator = new Mock<IMediator>();
        private readonly Mock<ILogger<SubscriptionController>> _logger = new Mock<ILogger<SubscriptionController>>();
        private readonly SubscriptionController _controller;

        public SubscriptionControllerTest()
        {
            _controller = new SubscriptionController(_mediator.Object, _logger.Object);
        }

        [Fact]
        public async void Get_HasNoData_ShouldReturnNoContent()
        {
            _mediator.Setup(x => x.Send(It.IsAny<GetSubscriptionQuery>(), default)).ReturnsAsync((SubscriptionDto)null);

            var result = await _controller.Get(Guid.NewGuid());

            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async void Get_HasData_ShouldReturnOk()
        {
            _mediator.Setup(x => x.Send(It.IsAny<GetSubscriptionQuery>(), default)).ReturnsAsync(new SubscriptionDto());

            var result = await _controller.Get(Guid.NewGuid());

            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void GetAll_HasNoData_ShouldReturnNotFound()
        {
            _mediator.Setup(x => x.Send(It.IsAny<GetAllSubscriptionQuery>(), default)).ReturnsAsync((IEnumerable<SubscriptionDto>)null);

            var result = await _controller.GetAll();

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async void GetAll_HasData_ShouldReturnOk()
        {
            _mediator.Setup(x => x.Send(It.IsAny<GetAllSubscriptionQuery>(), default)).ReturnsAsync(new List<SubscriptionDto>());

            var result = await _controller.GetAll();

            Assert.IsType<OkObjectResult>(result);
        }

        //[Fact]
        //public async void Post_HasData_ShouldReturnOk()
        //{
        //    var command = MockDataLoader.LoadMockData<CreateSubscriptionCommand>("CreateSubscriptionCommand", "Application/Resources/Mock/mock_subscription.json");

        //    _mediator.Setup(x => x.Send(It.IsAny<CreateSubscriptionCommand>(), default)).ReturnsAsync(true);

        //    var result = await _controller.Post(command);

        //    Assert.IsType<OkResult>(result);
        //}

        //[Fact]
        //public async Task Post_HasNoData_ShouldReturnBadRequest()
        //{
        //    var command = MockDataLoader.LoadMockData<CreateSubscriptionCommand>("CreateSubscriptionCommand", "Application/Resources/Mock/mock_subscription.json");

        //    _mediator.Setup(x => x.Send(It.IsAny<CreateSubscriptionCommand>(), default)).ReturnsAsync(false);

        //    var result = await _controller.Post(command);

        //    Assert.IsType<BadRequestResult>(result);
        //}
    }
}
