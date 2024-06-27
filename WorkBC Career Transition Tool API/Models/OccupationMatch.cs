namespace TransferrableSkillsToolAPI.Models
{
    public class OccupationMatch
    {
        public int Id { get; set; }
        public int SimilarityId { get; set; }
        public Similarity Similarity { get; set; }
        public string NOC { get; set; }
        public string Title { get; set; }
        public int? EducationId { get; set; }
        public EducationLevel Education { get; set; }
        public int? WorkExperienceId { get; set; }
        public WorkExperience WorkExperience { get; set; }
        public string Income { get; set; }
        public int? SalaryRangeId { get; set; }
        public Salary SalaryRange{ get; set; }
    }
}
