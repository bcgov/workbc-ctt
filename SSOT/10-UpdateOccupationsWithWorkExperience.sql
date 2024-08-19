--Update WorkExperienceId with a default value for all records in Occupations table.
Update Occupations Set WorkExperienceId=1
where WorkExperienceId is null
---------------------------------------------------------------------
Select * from Occupations