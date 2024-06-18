 --Load file contents into a table
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

ALTER TABLE #TempTitles ADD OccId int

Update #TempTitles Set OccId = 
(Select Id from Occupations
where Occupations.NOC = #TempTitles.noctitle)

Insert into CommonJobTitles (OccupationId, JobTitle)
Select OccId, commonjobtitle
From #TempTitles

Drop table #TempTitles

Select * from CommonJobTitles