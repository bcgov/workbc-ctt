using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using TransferrableSkillsToolAPI.Models;

namespace TransferrableSkillsToolAPI.DbContexts.Interfaces
{
    public interface IOccupationMatchContext : IDbContext
    {
        DbSet<OccupationMatch> OccupationMatches { get; set; }
        DbContext Instance { get; }

        List<OccupationMatch> FromSQLRaw(string rawSQL, params object[] parameters);
    }
}