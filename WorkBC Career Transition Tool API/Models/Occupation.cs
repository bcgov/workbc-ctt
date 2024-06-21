using System.Collections.Generic;

namespace TransferrableSkillsToolAPI.Models
{
    public class Occupation
    {
        public int Id { get; set; }
        public List<OccupationMatch> OccupationMatches { get; set; }
        public virtual List<CommonJobTitle> CommonJobTitles { get; set; }
        public string NOC { get; set; }
        public string Title { get; set; }
        public int? EducationId { get; set; }
        public EducationLevel Education { get; set; }
        public int? WorkExperienceId { get; set; }
        public WorkExperience WorkExperience { get; set; }
        public string Income { get; set; }
        public int? SalaryRangeId { get; set; }
        public Salary SalaryRange { get; set; }
    }
}
