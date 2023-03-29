using System.Collections.Generic;
using TransferrableSkillsToolAPI.Models;

namespace TransferrableSkillsToolAPI.Repositories.Interfaces
{
    public interface IWorkExperienceRepository
    {
        List<WorkExperience> GetWorkExperiences();
    }
}