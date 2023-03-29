namespace TransferrableSkillsToolAPI.Models
{
    public class CommonJobTitle
    {
        public int Id { get; set; }
        public virtual Occupation Occupation { get; set; }
        public string JobTitle { get; set; }
    }
}