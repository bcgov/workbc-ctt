using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using TransferrableSkillsToolAPI.DbContexts.Interfaces;
using TransferrableSkillsToolAPI.Models;

namespace TransferrableSkillsToolAPI.DbContexts
{
    public class OccupationMatchContext : DbContext, IOccupationMatchContext
    {
        public OccupationMatchContext(DbContextOptions<OccupationMatchContext> options)
            : base(options)
        {
        }

        public DbContext Instance => this;

        public DbSet<OccupationMatch> OccupationMatches { get; set; }

        public bool IsSQLServer
        {
            get { return Database.IsSqlServer(); }
            set { return; }
        }

        public List<OccupationMatch> FromSQLRaw(string rawSQL, params object[] parameters)
        {
            return OccupationMatches.FromSqlRaw(rawSQL, parameters).ToList();
        }
    }
}
