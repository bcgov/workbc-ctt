using System.Collections.Generic;
using TransferrableSkillsToolAPI.Models;

namespace TransferrableSkillsToolAPI.Repositories.Interfaces
{
    public interface IOccupationListItemRepository
    {
        List<OccupationListItem> GetOccupationListItems(string partialNocOrTitle);
    }
}