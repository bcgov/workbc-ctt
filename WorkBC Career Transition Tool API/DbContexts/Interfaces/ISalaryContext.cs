using Microsoft.EntityFrameworkCore;
using TransferrableSkillsToolAPI.Models;

namespace TransferrableSkillsToolAPI.DbContexts.Interfaces
{
    public interface ISalaryContext : IDbContext
    {
        DbSet<Salary> Salaries { get; set; }
        DbContext Instance { get; }
    }
}