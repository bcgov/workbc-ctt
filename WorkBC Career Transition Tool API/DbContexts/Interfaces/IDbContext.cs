using System;
using Microsoft.EntityFrameworkCore;

namespace TransferrableSkillsToolAPI.DbContexts.Interfaces
{
    public interface IDbContext: IDisposable
    {
        DbContext Instance { get; }

        bool IsSQLServer{ get; set; }
    }
}
