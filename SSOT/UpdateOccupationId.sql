-- Delete the content from teh relevant tables
delete from OccupationMatches
delete from CommonJobTitles
delete from Occupations
delete from EducationLevels
--Drop the foreign keys and primary keys on Id column in Occupations table.
ALTER TABLE CommonJobtitles
DROP CONSTRAINT FK_CommonJobTitles_Occupations;

ALTER TABLE OccupationMatches
DROP CONSTRAINT FK__Occupatio__Match__46E78A0C;

ALTER TABLE OccupationMatches
DROP CONSTRAINT FK__Occupatio__Curre__45F365D3;

ALTER TABLE Occupations
DROP CONSTRAINT PK__Occupati__3214EC07E5E92210;

--Drop the id column
ALTER TABLE Occupations DROP COLUMN Id

-- Create the id column and add it as PK
ALTER TABLE Occupations ADD Id INT IDENTITY(1,1) not null
CONSTRAINT PK__Occupati__3214EC07E5E92210 PRIMARY KEY CLUSTERED

-- Add the FK back to the tables
ALTER TABLE [dbo].[CommonJobTitles]  WITH CHECK ADD  CONSTRAINT [FK_CommonJobTitles_Occupations] FOREIGN KEY([OccupationId])
REFERENCES [dbo].[Occupations] ([Id])
GO

ALTER TABLE [dbo].[CommonJobTitles] CHECK CONSTRAINT [FK_CommonJobTitles_Occupations]
GO

ALTER TABLE [dbo].[OccupationMatches]  WITH CHECK ADD  CONSTRAINT [FK__Occupatio__Match__46E78A0C] FOREIGN KEY([MatchedOccupationId])
REFERENCES [dbo].[Occupations] ([Id])
GO

ALTER TABLE [dbo].[OccupationMatches] CHECK CONSTRAINT [FK__Occupatio__Match__46E78A0C]
GO

ALTER TABLE [dbo].[OccupationMatches]  WITH CHECK ADD  CONSTRAINT [FK__Occupatio__Curre__45F365D3] FOREIGN KEY([CurrentOccupationId])
REFERENCES [dbo].[Occupations] ([Id])
GO

ALTER TABLE [dbo].[OccupationMatches] CHECK CONSTRAINT [FK__Occupatio__Curre__45F365D3]
GO