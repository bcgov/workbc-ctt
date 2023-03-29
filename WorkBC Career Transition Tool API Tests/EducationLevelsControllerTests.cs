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
    public class EducationLevelsControllerTests
    {
        [Fact]
        public async void TestGetEducationLevels_Controller_NotEmpty()
        {
            // Arrange
            var dbContext = DbContextMocker.GetEducationLevelContext(nameof(TestGetEducationLevels_Controller_NotEmpty));
            var controller = new EducationLevelsController(dbContext);

            // Act
            var response = await controller.GetEducationLevels() as ActionResult<IEnumerable<EducationLevel>>;
            var value = response.Value as List<EducationLevel>;

            dbContext.Dispose();

            Assert.NotEmpty(value);
            //Assert.False(value.DidError);
        }

        [Fact]
        public async void TestGetEducationLevels_Repository_NotEmpty()
        {
            // Arrange
            var dbContext = DbContextMocker.GetEducationLevelContext(nameof(TestGetEducationLevels_Repository_NotEmpty));
            var repo = new EducationLevelRepository(dbContext);

            // Act
            var value = repo.GetEducationLevels() as List<EducationLevel>;
            
            dbContext.Dispose();

            Assert.NotEmpty(value);
            //Assert.False(value.DidError);
        }
    }
}
