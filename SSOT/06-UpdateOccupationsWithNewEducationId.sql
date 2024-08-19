--Load file contents into a temp table
Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'C:\src_ctt\SSOT\nocs.json', SINGLE_CLOB) import
SELECT * Into #TempNocs
FROM OPENJSON (@JSON)
WITH 
(
    [noc_2021] varchar(10), 
	[noc_level] varchar(5),
    [teer_level] varchar(5) 
)

--Update Occupations table from temp table
Update Occupations Set EducationId = 
(Select teer_level from #TempNocs
where Occupations.NOC = #TempNocs.noc_2021)

--Drop temp table
Drop table #TempNocs

--Check results
Select * from Occupations