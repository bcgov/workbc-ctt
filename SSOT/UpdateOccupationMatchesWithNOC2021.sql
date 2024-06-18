--Load file contents into a temp table
Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'C:\src_ctt\SSOT\career_transition_opportunities.json', SINGLE_CLOB) import
SELECT * Into #TempCto
FROM OPENJSON (@JSON)
WITH 
(
    [noccto] varchar(10), 
	[option_noccto] varchar(10),
    [similarity] varchar(10) 
)

--Add and update similarityId , current occupation id and matched occupation id from Similarities and Occupations tables.
ALTER TABLE #TempCto ADD SimId int

ALTER TABLE #TempCto ADD nococcId int

ALTER TABLE #TempCto ADD matchedoccId int

Update #TempCto Set SimId = 
(Select Id from Similarities
where Value = #TempCto.similarity)

Update #TempCto Set nococcId = 
(Select Id from Occupations
where Occupations.NOC = #TempCto.noccto)

Update #TempCto Set matchedoccId = 
(Select Id from Occupations
where Occupations.NOC = #TempCto.option_noccto)

-- Drop the PK
ALTER TABLE OccupationMatches
DROP CONSTRAINT PK__Occupati__3214EC0718151429;

-- Drop the id column
ALTER TABLE OccupationMatches DROP COLUMN Id

-- Create the id column and add it as PK
ALTER TABLE OccupationMatches ADD Id INT IDENTITY(1,1) not null
CONSTRAINT PK__Occupati__3214EC0718151429 PRIMARY KEY CLUSTERED

--Resetting the ID column
DBCC CHECKIDENT ('dbo.OccupationMatches', RESEED, 0);

--Inserting the records to OccupationMatches table from temp table.
Insert into OccupationMatches(CurrentoccupationId, MatchedOccupationId, SimilarityId)
Select nococcId, matchedoccId, SimId
From #TempCto

--Drop the temp table
Drop table #TempCto

--Check results
Select * from OccupationMatches
