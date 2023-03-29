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
    public class OccupationListItemsController : ControllerBase
    {
        private readonly OccupationListItemContext _context;
        private readonly IOccupationListItemRepository _repo;

        public OccupationListItemsController(OccupationListItemContext context)
        {
            _context = context;
            _repo = new OccupationListItemRepository(context);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OccupationListItem>>> GetOccupationListItems([FromQuery] string partialNocOrTitle)
        {
            return _repo.GetOccupationListItems(partialNocOrTitle);
        }
    }
}
