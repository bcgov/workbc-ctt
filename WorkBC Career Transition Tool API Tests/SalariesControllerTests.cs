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
    public class SalariesControllerTests
    {
        [Fact]
        public async void TestGetSalaries_Controller_NotEmpty()
        {
            // Arrange
            var dbContext = DbContextMocker.GetSalaryContext(nameof(TestGetSalaries_Controller_NotEmpty));
            var controller = new SalariesController(dbContext);

            // Act
            var response = await controller.GetSalaries() as ActionResult<IEnumerable<Salary>>;
            var value = response.Value as List<Salary>;

            dbContext.Dispose();

            Assert.NotEmpty(value);
            //Assert.False(value.DidError);
        }

        [Fact]
        public async void TestGetSalariesLevels_Repository_NotEmpty()
        {
            // Arrange
            var dbContext = DbContextMocker.GetSalaryContext(nameof(TestGetSalariesLevels_Repository_NotEmpty));
            var repo = new SalaryRepository(dbContext);

            // Act
            var value = repo.GetSalaries() as List<Salary>;
            
            dbContext.Dispose();

            Assert.NotEmpty(value);
            //Assert.False(value.DidError);
        }
    }
}
