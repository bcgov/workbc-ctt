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
    public class EducationLevelsController : ControllerBase
    {
        private readonly EducationLevelContext _context;
        private readonly IEducationLevelRepository _repo;
        
        public EducationLevelsController(EducationLevelContext context)
        {
            _context = context;
            _repo = new EducationLevelRepository(context);
        }

        // GET: api/EducationLevels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EducationLevel>>> GetEducationLevels()
        {
            return _repo.GetEducationLevels();
        }
    }
}
