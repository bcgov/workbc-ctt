using Microsoft.EntityFrameworkCore;
using TransferrableSkillsToolAPI.Models;

namespace TransferrableSkillsToolAPI.DbContexts.Interfaces
{
    public interface IEducationLevelContext : IDbContext
    {
        DbSet<EducationLevel> EducationLevels { get; set; }
        DbContext Instance { get; }
    }
}