using System.Collections.Generic;
using System.Linq;
using TransferrableSkillsToolAPI.DbContexts.Interfaces;
using TransferrableSkillsToolAPI.Models;
using TransferrableSkillsToolAPI.Repositories.Interfaces;

namespace TransferrableSkillsToolAPI.Repositories
{
    public class SalaryRepository : ISalaryRepository
    {
        private readonly ISalaryContext _context;

        public SalaryRepository(ISalaryContext dbContext)
        {
            _context = dbContext;
        }

        public List<Salary> GetSalaries()
        {
            if (_context.IsSQLServer)
            {
                return _context.Salaries.ToList();
            }
            else
            {
                List<Salary> salaries = new List<Salary>(){
                    new Salary() {
                        Id = 1,
                        Value = "< $40k"
                    },
                    new Salary() {
                        Id = 2,
                        Value = "$40k-$60k"
                    },
                    new Salary() {
                        Id = 3,
                        Value = "$60k-$80k"
                    },
                    new Salary() {
                        Id = 4,
                        Value = "$80k-$100k"
                    },
                    new Salary() {
                        Id = 5,
                        Value = "> 100k"
                    }
                };
                return salaries;
            }
            //return await _context.Salarys.ToListAsync();
        }
    }
}
