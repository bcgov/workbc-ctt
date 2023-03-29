using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using TransferrableSkillsToolAPI.Models;

namespace TransferrableSkillsToolAPI.DbContexts.Interfaces
{
    public interface IOccupationListItemContext : IDbContext
    {
        DbSet<OccupationListItem> OccupationListItems { get; set; }
        DbSet<Occupation> Occupations { get; set; }
        DbSet<CommonJobTitle> CommonJobTitles { get; set; }
        
        DbContext Instance { get; }
        
        public List<OccupationListItem> FromSQLRaw(string rawSQL, params object[] parameters);
    }
}