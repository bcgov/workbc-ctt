using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using TransferrableSkillsToolAPI.Models;

namespace TransferrableSkillsToolAPI.DbContexts.Interfaces
{
    public interface IOccupationContext : IDbContext
    {
        DbSet<Occupation> Occupations { get; set; }

        DbContext Instance { get; }

        public List<Occupation> FromSQLRaw(string rawSQL, params object[] parameters);
    }
}