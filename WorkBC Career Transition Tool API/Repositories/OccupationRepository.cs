using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.Linq;
using TransferrableSkillsToolAPI.DbContexts.Interfaces;
	@@ -18,7 +18,7 @@ public class OccupationRepository : IOccupationRepository
        private readonly ISimilarityContext _similarityContext;

        public OccupationRepository(IOccupationContext dbContext,
            IWorkExperienceContext workExperienceContext, 
            ISalaryContext salaryRangeContext,
            IEducationLevelContext educationLevelContext,
            IOccupationMatchContext occupationMatchContext,
	@@ -41,31 +41,36 @@ ISimilarityContext similarityContext
        {
            if (NOC != null)
                return FindMatchingOccupations(NOC, similarityId, educationLevelId, salaryId, workExperienceId);
            
            return GetOccupationsPrivate(false, NOC);
        }

        private List<Occupation> GetOccupationsPrivate(bool returnMatches, string NOC)
        {
            if (!_context.IsSQLServer) 
                return GetStaticOccupations(returnMatches);
            
            var occupations = _context.Occupations.ToList();
                
            if (!string.IsNullOrEmpty(NOC))
                occupations = occupations.FindAll(x => x.NOC == NOC);
                
            var localWorkExperiencesList = _workExperienceContext.WorkExperiences.ToList();
            var localSalaryRangesList = _salaryRangeContext.Salaries.ToList();
            var localEducationLevelsList = _educationLevelContext.EducationLevels.ToList();
            var localSimilaritiesList = _similarityContext.Similarities.ToList();

            foreach (var occupation in occupations)
            {
                occupation.WorkExperience = localWorkExperiencesList.FindAll(x => x.Id == occupation.WorkExperienceId).FirstOrDefault();
                occupation.SalaryRange = localSalaryRangesList.FindAll(x => x.Id == occupation.SalaryRangeId).FirstOrDefault();
                occupation.Education = localEducationLevelsList.FindAll(x => x.Id == occupation.EducationId).FirstOrDefault();
                    
                var occupationId = new SqlParameter("occupationId", occupation.Id);
                var localOccupationMatchesList = _occupationMatchContext.FromSQLRaw(@"select 
	                        MatchedOccupation.Id,
	@@ -89,12 +94,18 @@ private List<Occupation> GetOccupationsPrivate(bool returnMatches, string NOC)
                    matchedOccupation.SalaryRange = localSalaryRangesList.FindAll(x => x.Id == matchedOccupation.SalaryRangeId).FirstOrDefault();
                    matchedOccupation.Education = localEducationLevelsList.FindAll(x => x.Id == matchedOccupation.EducationId).FirstOrDefault();
                    matchedOccupation.Similarity = localSimilaritiesList.FindAll(x => x.Id == matchedOccupation.SimilarityId).FirstOrDefault();
                }

                occupation.OccupationMatches = localOccupationMatchesList;
            }

            return _context.Occupations.ToList();

        }

	@@ -108,15 +119,28 @@ private static List<Occupation> GetStaticOccupations(bool returnMatches)
                    new Occupation
                    {
                        Id = 1,
                        NOC = "0011",
                        Title = "Legislators",
                        EducationId = 4,
                        Education = new EducationLevel() {Id = 4, Value = "Degree"},
                        WorkExperienceId = 4,
                        WorkExperience = new WorkExperience() {Id = 4, Value = "> 4 years to 10 years"},
                        Income = "59,545",
                        SalaryRangeId = 2,
                        SalaryRange = new Salary() {Id = 2, Value = "$40k-$60k"}
                    }
                };
            }
	@@ -127,77 +151,154 @@ private static List<Occupation> GetStaticOccupations(bool returnMatches)
                    new Occupation
                    {
                        Id = 1,
                        NOC = "0011",
                        Title = "Legislators",
                        EducationId = 4,
                        Education = new EducationLevel() {Id = 4, Value = "Degree"},
                        WorkExperienceId = 4,
                        WorkExperience = new WorkExperience() {Id = 4, Value = "> 4 years to 10 years"},
                        Income = "59,545",
                        SalaryRangeId = 2,
                        SalaryRange = new Salary() {Id = 2, Value = "$40k-$60k"},
                        OccupationMatches = new List<OccupationMatch>()
                        {
                            new OccupationMatch
                            {
                                Id = 2,
                                SimilarityId = 3,
                                Similarity = new Similarity() {Id = 3, Value = "High"},
                                NOC = "0012",
                                Title = "Senior government managers and officials",
                                EducationId = 4,
                                Education = new EducationLevel() {Id = 4, Value = "Degree"},
                                WorkExperienceId = 4,
                                WorkExperience = new WorkExperience() {Id = 4, Value = "> 4 years to 10 years"},
                                Income = "108,727",
                                SalaryRangeId = 5,
                                SalaryRange = new Salary() {Id = 5, Value = "> 100k"}
                            },
                            new OccupationMatch
                            {
                                Id = 3,
                                SimilarityId = 3,
                                Similarity = new Similarity() {Id = 3, Value = "High"},
                                NOC = "0013",
                                Title = "Senior managers - financial, communications and other business services",
                                EducationId = 4,
                                Education = new EducationLevel() {Id = 4, Value = "Degree"},
                                WorkExperienceId = 4,
                                WorkExperience = new WorkExperience() {Id = 4, Value = "> 4 years to 10 years"},
                                Income = "119,882",
                                SalaryRangeId = 5,
                                SalaryRange = new Salary() {Id = 5, Value = "> 100k"}
                            },
                            new OccupationMatch()
                            {
                                Id = 4,
                                SimilarityId = 3,
                                Similarity = new Similarity() {Id = 3, Value = "High"},
                                NOC = "0014",
                                Title =
                                    "Senior managers - health, education, social and community services and membership organizations",
                                EducationId = 4,
                                Education = new EducationLevel() {Id = 4, Value = "Degree"},
                                WorkExperienceId = 3,
                                WorkExperience = new WorkExperience() {Id = 3, Value = "> 1 year to 4 years"},
                                Income = "96,077",
                                SalaryRangeId = 4,
                                SalaryRange = new Salary() {Id = 4, Value = "$80k-$100k"}
                            },
                            new OccupationMatch()
                            {
                                Id = 14,
                                SimilarityId = 3,
                                Similarity = new Similarity() {Id = 3, Value = "High"},
                                NOC = "0125",
                                Title = "Other business services managers",
                                EducationId = 3,
                                Education = new EducationLevel() {Id = 3, Value = "Diploma/Certificate"},
                                WorkExperienceId = 4,
                                WorkExperience = new WorkExperience() {Id = 4, Value = "> 4 years to 10 years"},
                                Income = "59,114",
                                SalaryRangeId = 2,
                                SalaryRange = new Salary() {Id = 2, Value = "$40k-$60k"}
                            }
                        }
                    }
	
