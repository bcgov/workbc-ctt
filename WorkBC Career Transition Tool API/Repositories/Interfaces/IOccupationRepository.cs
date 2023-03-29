using System.Collections.Generic;
using TransferrableSkillsToolAPI.Models;

namespace TransferrableSkillsToolAPI.Repositories.Interfaces
{
    public interface IOccupationRepository
    {
        List<Occupation> GetOccupations(string NOC, int? similarityId, int? educationLevelId, int? salaryId, int? workExperienceId);
    }
}