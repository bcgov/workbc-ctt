using System;
using System.Net.Http;
using Xunit;
using TransferrableSkillsToolAPI.Models;
using System.Collections.Generic;
using TransferrableSkillsToolAPI.Controllers;
using TransferrableSkillsToolAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace TransferrableSkillsToolAPITests
{
    public class OccupationListItemsControllerTests
    {
        [Fact]
        public async void TestGetOccupationListItems_Controller_NotEmpty()
        {
            // Arrange
            var dbContext = DbContextMocker.GetOccupationListItemContext(nameof(TestGetOccupationListItems_Controller_NotEmpty));
            var controller = new OccupationListItemsController(dbContext);

            // Act
            var response = await controller.GetOccupationListItems(null) as ActionResult<IEnumerable<OccupationListItem>>;
            var value = response.Value as List<OccupationListItem>;

            dbContext.Dispose();

            Assert.NotEmpty(value);
            //Assert.False(value.DidError);
        }

        [Fact]
        public async void TestGetOccupationListItemsLevels_Repository_NotEmpty()
        {
            // Arrange
            var dbContext = DbContextMocker.GetOccupationListItemContext(nameof(TestGetOccupationListItemsLevels_Repository_NotEmpty));
            var repo = new OccupationListItemRepository(dbContext);

            // Act
            var value = repo.GetOccupationListItems(null) as List<OccupationListItem>;

            dbContext.Dispose();

            Assert.NotEmpty(value);
            //Assert.False(value.DidError);
        }

        [Fact]
        public async void TestGetOccupationListItems_Controller_00010_Has_One_Match()
        {
            // Arrange
            var dbContext = DbContextMocker.GetOccupationListItemContext(nameof(TestGetOccupationListItems_Controller_00010_Has_One_Match));
            var controller = new OccupationListItemsController(dbContext);

            // Act
            var response = await controller.GetOccupationListItems("00010") as ActionResult<IEnumerable<OccupationListItem>>;
            var value = response.Value as List<OccupationListItem>;

            dbContext.Dispose();

            Assert.Single(value);
            //Assert.False(value.DidError);
        }

        [Fact]
        public async void TestGetOccupationListItemsLevels_Repository_00010_Has_One_Match()
        {
            // Arrange
            var dbContext = DbContextMocker.GetOccupationListItemContext(nameof(TestGetOccupationListItemsLevels_Repository_00010_Has_One_Match));
            var repo = new OccupationListItemRepository(dbContext);

            // Act
            var value = repo.GetOccupationListItems("00010") as List<OccupationListItem>;
            
            dbContext.Dispose();

            Assert.Single(value);
            //Assert.False(value.DidError);
        }
    }
}
