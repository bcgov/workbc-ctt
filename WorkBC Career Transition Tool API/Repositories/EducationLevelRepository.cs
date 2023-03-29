using System.Collections.Generic;
using System.Linq;
using TransferrableSkillsToolAPI.DbContexts.Interfaces;
using TransferrableSkillsToolAPI.Models;
using TransferrableSkillsToolAPI.Repositories.Interfaces;

namespace TransferrableSkillsToolAPI.Repositories
{
    public class EducationLevelRepository : IEducationLevelRepository
    {
        private readonly IEducationLevelContext _context;

        public EducationLevelRepository(IEducationLevelContext dbContext)
        {
            _context = dbContext;
        }

        public List<EducationLevel> GetEducationLevels()
        {
            if (_context.IsSQLServer)
            {
                return _context.EducationLevels.ToList();
            }
            else
            {
                List<EducationLevel> educationLevels = new List<EducationLevel>(){
                new EducationLevel() {
                    Id = 1,
                    Value = "Less than High School"
                },
                new EducationLevel() {
                    Id = 2,
                    Value = "High School"
                },
                new EducationLevel() {
                    Id = 3,
                    Value = "Diploma/Certificate"
                },
                new EducationLevel() {
                    Id = 4,
                    Value = "Degree"
                }
            };
                return educationLevels;
            }
            //return await _context.EducationLevels.ToListAsync();
        }
    }
}
