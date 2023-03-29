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
    public class SimilaritiesController : ControllerBase
    {
        private readonly SimilarityContext _context;
        private readonly ISimilarityRepository _repo;

        public SimilaritiesController(SimilarityContext context)
        {
            _context = context;
            _repo = new SimilarityRepository(context);
        }

        // GET: api/Similarities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Similarity>>> GetSimilarities()
        {
            return _repo.GetSimilarities();
        }
    }
}
