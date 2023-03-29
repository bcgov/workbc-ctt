using System.Collections.Generic;
using System.Linq;
using TransferrableSkillsToolAPI.DbContexts.Interfaces;
using TransferrableSkillsToolAPI.Models;
using TransferrableSkillsToolAPI.Repositories.Interfaces;

namespace TransferrableSkillsToolAPI.Repositories
{
    public class SimilarityRepository : ISimilarityRepository
    {
        private readonly ISimilarityContext _context;

        public SimilarityRepository(ISimilarityContext dbContext)
        {
            _context = dbContext;
        }

        public List<Similarity> GetSimilarities()
        {
            //if (_context.Database.IsSqlServer())
            if (_context.IsSQLServer)
            {
                return _context.Similarities.ToList();
            }
            else
            {
                List<Similarity> Similarities = new List<Similarity>(){
                    new Similarity() {
                        Id = 1,
                        Value = "All"
                    },
                    new Similarity() {
                        Id = 2,
                        Value = "Medium"
                    },
                    new Similarity() {
                        Id = 3,
                        Value = "High"
                    }
                };
                return Similarities;
            }
            //return await _context.Similaritys.ToListAsync();
        }
    }
}
