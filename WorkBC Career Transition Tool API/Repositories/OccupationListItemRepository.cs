using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using TransferrableSkillsToolAPI.DbContexts.Interfaces;
using TransferrableSkillsToolAPI.Extensions;
using TransferrableSkillsToolAPI.Models;
using TransferrableSkillsToolAPI.Repositories.Interfaces;

namespace TransferrableSkillsToolAPI.Repositories
{
    public class OccupationListItemRepository : IOccupationListItemRepository
    {
        private readonly IOccupationListItemContext _context;

        public OccupationListItemRepository(IOccupationListItemContext dbContext)
        {
            _context = dbContext;
        }

        private IQueryable<Occupation> GetOccupationsList()
        {
            if (_context.IsSQLServer)
            {
                return _context.Occupations
                    .AsNoTracking()
                    .AsQueryable();
            }

            return GetTestOccupations();
        }

        private static IQueryable<Occupation> GetTestOccupations()
        {
            return new List<Occupation>
            {
                new Occupation
                {
                    Id = 1,
                    NOC = "0011",
                    Title = "Legislators"
                },
                new Occupation
                {
                    Id = 2,
                    NOC = "0012",
                    Title = "Senior government managers and officials"
                },
                new Occupation
                {
                    Id = 3,
                    NOC = "0013",
                    Title = "Senior managers - financial, communications and other business services"
                }
            }.AsQueryable();
        }

        public List<OccupationListItem> GetOccupationListItems(string partialNocOrTitle)
        {
            var items = GetOccupationsList();
            if (string.IsNullOrWhiteSpace(partialNocOrTitle))
                return items.AsOccupationListItems();

            var keywords = partialNocOrTitle.ToUpper();
            if (int.TryParse(keywords, out int nocOnly))
            {
                return items
                    .Where(o => o.NOC.StartsWith(keywords))
                    .AsOccupationListItems();
            }
            
            var occupationsWithJobTitles = _context.CommonJobTitles
                .Include(c => c.Occupation)
                .AsNoTracking()
                .Where(c => c.JobTitle.Contains(keywords))
                .Distinct()
                .Select(c => c.Occupation)
                .Distinct()
                .ToList();

            var filteredItems = items
                .Where(o => (o.NOC + " - " + o.Title).Contains(keywords))
                .Distinct()
                .ToList();

            return occupationsWithJobTitles
                .Union(filteredItems)
                .GroupBy(o => o.Id)
                .Select(occupations => occupations.FirstOrDefault())
                .Where(o => o != null)
                .OrderBy(o => o.NOC)
                .AsOccupationListItems();
        }
    }
}