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
    public class WorkExperiencesControllerTests
    {
        [Fact]
        public async void TestGetWorkExperiences_Controller_NotEmpty()
        {
            // Arrange
            var dbContext = DbContextMocker.GetWorkExperienceContext(nameof(TestGetWorkExperiences_Controller_NotEmpty));
            var controller = new WorkExperiencesController(dbContext);

            // Act
            var response = await controller.GetWorkExperiences() as ActionResult<IEnumerable<WorkExperience>>;
            var value = response.Value as List<WorkExperience>;

            dbContext.Dispose();

            Assert.NotEmpty(value);
            //Assert.False(value.DidError);
        }

        [Fact]
        public async void TestGetWorkExperiencesLevels_Repository_NotEmpty()
        {
            // Arrange
            var dbContext = DbContextMocker.GetWorkExperienceContext(nameof(TestGetWorkExperiencesLevels_Repository_NotEmpty));
            var repo = new WorkExperienceRepository(dbContext);

            // Act
            var value = repo.GetWorkExperiences() as List<WorkExperience>;
            
            dbContext.Dispose();

            Assert.NotEmpty(value);
            //Assert.False(value.DidError);
        }
    }
}
