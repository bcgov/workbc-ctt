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
    public class SimilaritiesControllerTests
    {
        [Fact]
        public async void TestGetSimilarities_Controller_NotEmpty()
        {
            // Arrange
            var dbContext = DbContextMocker.GetSimilarityContext(nameof(TestGetSimilarities_Controller_NotEmpty));
            var controller = new SimilaritiesController(dbContext);

            // Act
            var response = await controller.GetSimilarities() as ActionResult<IEnumerable<Similarity>>;
            var value = response.Value as List<Similarity>;

            dbContext.Dispose();

            Assert.NotEmpty(value);
            //Assert.False(value.DidError);
        }

        [Fact]
        public async void TestGetSimilaritiesLevels_Repository_NotEmpty()
        {
            // Arrange
            var dbContext = DbContextMocker.GetSimilarityContext(nameof(TestGetSimilaritiesLevels_Repository_NotEmpty));
            var repo = new SimilarityRepository(dbContext);

            // Act
            var value = repo.GetSimilarities() as List<Similarity>;
            
            dbContext.Dispose();

            Assert.NotEmpty(value);
            //Assert.False(value.DidError);
        }
    }
}
