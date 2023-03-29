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
    public class WorkExperiencesController : ControllerBase
    {
        private readonly WorkExperienceContext _context;
        private readonly IWorkExperienceRepository _repo;

        public WorkExperiencesController(WorkExperienceContext context)
        {
            _context = context;
            _repo = new WorkExperienceRepository(context);
        }

        // GET: api/WorkExperiences
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkExperience>>> GetWorkExperiences()
        {
            return _repo.GetWorkExperiences();
        }
    }
}
