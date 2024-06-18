--Load file contents into a temp table
Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'C:\src_ctt\SSOT\titles.json', SINGLE_CLOB) import
SELECT * Into #TempTitles
FROM OPENJSON (@JSON)
WITH 
(
    [noctitle] varchar(10), 
	[commonjobtitle] varchar(500)
)

--Add and update the temp table with Occupation Id from Occupations table.
ALTER TABLE #TempTitles ADD OccId int

Update #TempTitles Set OccId = 
(Select Id from Occupations
where Occupations.NOC = #TempTitles.noctitle)

--Resetting the id column of CommonJobTitles table
DBCC CHECKIDENT ('dbo.CommonJobTitles', RESEED, 0);

--Insert data into CommonJobTitles table from temp table.
Insert into CommonJobTitles (OccupationId, JobTitle)
Select OccId, commonjobtitle
From #TempTitles

--Delete temp table
Drop table #TempTitles

--Check results
Select * from CommonJobTitles
