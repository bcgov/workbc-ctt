using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.Extensions.Configuration;
using TransferrableSkillsToolAPI.Models;
using TransferrableSkillsToolAPI.Repositories.Interfaces;

namespace TransferrableSkillsToolAPI.Repositories
{
    public class ConfigurationRepository : IConfigurationRepository
    {
        private readonly IConfiguration _configuration;

        public ConfigurationRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public List<Configuration> GetConfigurations()
        {
            var configurations = new List<Configuration>
            {
                GetImageCarouselNOCs(), 
                GetProfileImagesPath(), 
                GetBackgroundImagesPath()
            };

            return configurations;
        }

        public List<Configuration> GetConfigurations(string settingName)
        {
            var setting = settingName.ToLower();

            if (setting == "ImageCarouselNOCs".ToLower())
                return new List<Configuration> {GetImageCarouselNOCs()};

            if (setting == "ProfileImagesPath".ToLower())
                return new List<Configuration> {GetProfileImagesPath()};

            if (setting == "BackgroundImagesPath".ToLower())
                return new List<Configuration> {GetBackgroundImagesPath()};

            return new List<Configuration>();
        }

        private Configuration GetImageCarouselNOCs()
        {
            var nocs = _configuration["ImageCarouselNOCsDefault"];
            try
            {
                var nocStreamReader = new StreamReader(_configuration["ImageCarouselNOCConfigLocalPath"]);
                nocs = nocStreamReader.ReadToEnd();
                nocStreamReader.Close();
            }
            catch (Exception)
            {
                // ignored
            }

            return new Configuration
            {
                Id = 1,
                Name = "ImageCarouselNOCs",
                Value = nocs.Trim()
            };
        }

        private Configuration GetProfileImagesPath()
        {
            return new Configuration()
            {
                Id = 2,
                Name = "ProfileImagesPath",
                //Value = "https://www.workbc.ca/careertransitiontool/HostedImages/Profiles/"
                Value = _configuration["SharedImagesProfilesBaseURL"]
            };
        }

        private Configuration GetBackgroundImagesPath()
        {
            return new Configuration()
            {
                Id = 3,
                Name = "BackgroundImagesPath",
                //Value = "https://www.workbc.ca/careertransitiontool/HostedImages/Backgrounds/"
                Value = _configuration["SharedImagesBackgroundsBaseURL"]
            };
        }
    }
}
