using Microsoft.EntityFrameworkCore;
using TransferrableSkillsToolAPI.DbContexts.Interfaces;
using TransferrableSkillsToolAPI.Models;

namespace TransferrableSkillsToolAPI.DbContexts
{
    public class SimilarityContext : DbContext, ISimilarityContext
    {
        public SimilarityContext(DbContextOptions<SimilarityContext> options)
            : base(options)
        {
        }
        
        public DbContext Instance => this;

        public DbSet<Similarity> Similarities { get; set; }

        public bool IsSQLServer
        {
            get { return this.Database.IsSqlServer(); }
            set { return; }
        }
    }
}
