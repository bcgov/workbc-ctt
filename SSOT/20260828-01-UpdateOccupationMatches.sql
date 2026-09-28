-- Load file contents into a temp table.
Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'C:\src_ctt\SSOT\career_transition_opportunities.json', SINGLE_CLOB) import
SELECT * INTO #TempCto
FROM OPENJSON (@JSON)
WITH
(
    [noc] varchar(10),
	  [option_noc] varchar(10),
    [similarity] varchar(10)
)

-- Add and update similarityId , current occupation id and matched occupation id from Similarities and Occupations tables.
ALTER TABLE #TempCto ADD SimId int

ALTER TABLE #TempCto ADD nococcId int

ALTER TABLE #TempCto ADD matchedoccId int

UPDATE #TempCto SET SimId =
(SELECT Id FROM Similarities
WHERE Value = #TempCto.similarity)

UPDATE #TempCto Set nococcId =
(SELECT Id FROM Occupations
WHERE Occupations.NOC = #TempCto.noc)

UPDATE #TempCto Set matchedoccId =
(SELECT Id FROM Occupations
WHERE Occupations.NOC = #TempCto.option_noc)

-- Reset OccupationMatches table.
DELETE FROM OccupationMatches
DBCC CHECKIDENT ('dbo.OccupationMatches', RESEED, 1);

-- Insert the records to OccupationMatches table from temp table.
INSERT INTO OccupationMatches(CurrentoccupationId, MatchedOccupationId, SimilarityId)
SELECT nococcId, matchedoccId, SimId
FROM #TempCto

-- Drop the temp table.
DROP TABLE #TempCto

-- Check results.
SELECT * FROM OccupationMatches
