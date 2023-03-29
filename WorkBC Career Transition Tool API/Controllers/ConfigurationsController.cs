using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using TransferrableSkillsToolAPI.Models;
using TransferrableSkillsToolAPI.Repositories;
using TransferrableSkillsToolAPI.Repositories.Interfaces;

namespace TransferrableSkillsToolAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ConfigurationsController : ControllerBase
    {
        private readonly IConfigurationRepository _repo;

        public ConfigurationsController(IConfiguration configuration)
        {
            _repo = new ConfigurationRepository(configuration);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Configuration>>> GetConfigurations([FromQuery] string settingName)
        {
            return string.IsNullOrEmpty(settingName) 
                ? _repo.GetConfigurations() 
                : _repo.GetConfigurations(settingName);
        }
    }
}
