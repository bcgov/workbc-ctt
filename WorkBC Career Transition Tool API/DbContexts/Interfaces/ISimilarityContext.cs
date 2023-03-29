using Microsoft.EntityFrameworkCore;
using TransferrableSkillsToolAPI.Models;

namespace TransferrableSkillsToolAPI.DbContexts.Interfaces
{
    public interface ISimilarityContext : IDbContext
    {
        DbSet<Similarity> Similarities { get; set; }
        DbContext Instance { get; }
    }
}