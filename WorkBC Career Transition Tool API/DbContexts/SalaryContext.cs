using Microsoft.EntityFrameworkCore;
using TransferrableSkillsToolAPI.DbContexts.Interfaces;
using TransferrableSkillsToolAPI.Models;

namespace TransferrableSkillsToolAPI.DbContexts
{
    public class SalaryContext : DbContext, ISalaryContext
    {
        public SalaryContext(DbContextOptions<SalaryContext> options)
            : base(options)
        {
        }
        public DbContext Instance => this;

        public DbSet<Salary> Salaries { get; set; }

        public bool IsSQLServer
        {
            get { return this.Database.IsSqlServer(); }
            set { return; }
        }
    }
}
