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
    public class OccupationsController : ControllerBase
    {
        private readonly OccupationContext _context;
        private readonly WorkExperienceContext _workExperienceContext;
        private readonly SalaryContext _salaryRangeContext;
        private readonly EducationLevelContext _educationLevelContext;
        private readonly OccupationMatchContext _occupationMatchContext;
        private readonly SimilarityContext _similarityContext;

        private readonly IOccupationRepository _repo;

        public OccupationsController(OccupationContext context, 
            WorkExperienceContext workExperienceContext,
            SalaryContext salaryContext,
            EducationLevelContext educationLevelContext,
            OccupationMatchContext occupationMatchContext,
            SimilarityContext similarityContext)
        {
            _context = context;
            _workExperienceContext = workExperienceContext;
            _salaryRangeContext = salaryContext;
            _educationLevelContext = educationLevelContext;
            _occupationMatchContext = occupationMatchContext;
            _similarityContext = similarityContext;

            _repo = new OccupationRepository(_context,
                _workExperienceContext,
                _salaryRangeContext,
                _educationLevelContext,
                _occupationMatchContext,
                _similarityContext);
        }

        // GET: api/Occupations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Occupation>>> GetOccupations([FromQuery] string NOC,
            [FromQuery] int? similarityId,
            [FromQuery] int? educationLevelId,
            [FromQuery] int? salaryId,
            [FromQuery] int? workExperienceId)
        {
            return _repo.GetOccupations(NOC,
                similarityId,
                educationLevelId,
                salaryId,
                workExperienceId);
        }
    }
}
