--Drop the foreign keys and WorkExperienceId column in Occupations table.
ALTER TABLE Occupations
DROP CONSTRAINT FK__Occupatio__WorkE__4222D4EF;

Alter Table Occupations
Drop column WorkExperienceId;

Select * from Occupations
