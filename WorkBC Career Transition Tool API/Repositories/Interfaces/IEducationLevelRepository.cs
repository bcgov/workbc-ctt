using System.Collections.Generic;
using TransferrableSkillsToolAPI.Models;

namespace TransferrableSkillsToolAPI.Repositories.Interfaces
{
    public interface IEducationLevelRepository
    {
        List<EducationLevel> GetEducationLevels();
    }
}