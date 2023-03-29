using System.Collections.Generic;
using TransferrableSkillsToolAPI.Models;

namespace TransferrableSkillsToolAPI.Repositories.Interfaces
{
    public interface IConfigurationRepository
    { 
        List<Configuration> GetConfigurations();
        List<Configuration> GetConfigurations(string settingName); 
    }
}