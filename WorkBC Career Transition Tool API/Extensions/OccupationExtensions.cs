using System.Collections.Generic;
using System.Linq;
using TransferrableSkillsToolAPI.Models;

namespace TransferrableSkillsToolAPI.Extensions
{
    public static class OccupationExtensions
    {
        public static List<OccupationListItem> AsOccupationListItems(this IEnumerable<Occupation> occupations)
        {
            return occupations.Select(o => new OccupationListItem
                {
                    Id = o.Id,
                    NOC = o.NOC,
                    NOCAndTitle = $"{o.NOC} - {o.Title}"
                })
                .ToList();
        }

    }
}