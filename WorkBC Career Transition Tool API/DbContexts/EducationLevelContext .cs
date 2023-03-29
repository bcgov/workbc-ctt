using Microsoft.EntityFrameworkCore;
using TransferrableSkillsToolAPI.DbContexts.Interfaces;
using TransferrableSkillsToolAPI.Models;

namespace TransferrableSkillsToolAPI.DbContexts
{
    public class EducationLevelContext : DbContext, IEducationLevelContext
    {
        public EducationLevelContext(DbContextOptions<EducationLevelContext> options)
            : base(options)
        {
        }
        public DbContext Instance => this;

        public DbSet<EducationLevel> EducationLevels { get; set; }

        public bool IsSQLServer { 
            get { return this.Database.IsSqlServer(); }
            set { return; }
        }
    }
}
