using Microsoft.EntityFrameworkCore;
using TransferrableSkillsToolAPI.Models;

namespace TransferrableSkillsToolAPI.DbContexts.Interfaces
{
    public interface IWorkExperienceContext : IDbContext
    {
        DbSet<WorkExperience> WorkExperiences { get; set; }
        DbContext Instance { get; }
    }
}