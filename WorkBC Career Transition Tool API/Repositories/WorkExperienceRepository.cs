using System.Collections.Generic;
using System.Linq;
using TransferrableSkillsToolAPI.DbContexts.Interfaces;
using TransferrableSkillsToolAPI.Models;
using TransferrableSkillsToolAPI.Repositories.Interfaces;

namespace TransferrableSkillsToolAPI.Repositories
{
    public class WorkExperienceRepository : IWorkExperienceRepository
    {
        private readonly IWorkExperienceContext _context;

        public WorkExperienceRepository(IWorkExperienceContext dbContext)
        {
            _context = dbContext;
        }

        public List<WorkExperience> GetWorkExperiences()
        {
            if (_context.IsSQLServer)
            {
                return _context.WorkExperiences.ToList();
            }
            else
            {
                List<WorkExperience> WorkExperiences = new List<WorkExperience>(){
                    new WorkExperience() {
                        Id = 1,
                        Value = "None"
                    },
                    new WorkExperience() {
                        Id = 2,
                        Value = "< 1 year"
                    },
                    new WorkExperience() {
                        Id = 3,
                        Value = "> 1 year to 4 years"
                    },
                    new WorkExperience() {
                        Id = 4,
                        Value = "> 4 years to 10 years"
                    }
                };
                return WorkExperiences;
            }
            //return await _context.WorkExperiences.ToListAsync();
        }
    }
}
