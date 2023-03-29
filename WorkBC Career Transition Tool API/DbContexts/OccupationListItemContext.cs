using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using TransferrableSkillsToolAPI.DbContexts.Interfaces;
using TransferrableSkillsToolAPI.Models;

namespace TransferrableSkillsToolAPI.DbContexts
{
    public class OccupationListItemContext : DbContext, IOccupationListItemContext
    {
        public OccupationListItemContext(DbContextOptions<OccupationListItemContext> options)
            : base(options)
        {
        }

        public DbContext Instance => this;

        public DbSet<OccupationListItem> OccupationListItems { get; set; }
        public DbSet<Occupation> Occupations { get; set; }
        public DbSet<CommonJobTitle> CommonJobTitles { get; set; }

        public bool IsSQLServer
        {
            get { return Database.IsSqlServer(); }
            set { return; }
        }

        public List<OccupationListItem> FromSQLRaw(string rawSQL, params object[] parameters)
        {
            return OccupationListItems.FromSqlRaw(rawSQL, parameters).ToList();
        }
    }
}
