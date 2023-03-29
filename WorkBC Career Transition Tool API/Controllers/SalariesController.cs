using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TransferrableSkillsToolAPI.DbContexts;
using TransferrableSkillsToolAPI.Models;
using TransferrableSkillsToolAPI.Repositories;
using TransferrableSkillsToolAPI.Repositories.Interfaces;

namespace TransferrableSkillsToolAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SalariesController : ControllerBase
    {
        private readonly SalaryContext _context;
        private readonly ISalaryRepository _repo;

        public SalariesController(SalaryContext context)
        {
            _context = context;
            _repo = new SalaryRepository(context);
        }

        // GET: api/Salaries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Salary>>> GetSalaries()
        {
            return _repo.GetSalaries();
        }
    }
}
