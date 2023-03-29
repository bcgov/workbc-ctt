using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using TransferrableSkillsToolAPI.DbContexts.Interfaces;
using TransferrableSkillsToolAPI.Models;

namespace TransferrableSkillsToolAPI.DbContexts
{
    public class OccupationContext : DbContext, IOccupationContext
    {
        public OccupationContext(DbContextOptions<OccupationContext> options)
            : base(options)
        {
        }

        public DbContext Instance => this;

        public DbSet<Occupation> Occupations { get; set; }

        public bool IsSQLServer
        {
            get { return Database.IsSqlServer(); }
            set { return; }
        }

        public List<Occupation> FromSQLRaw(string rawSQL, params object[] parameters)
        {
            return Occupations.FromSqlRaw(rawSQL, parameters).ToList();
        }
    }
}
