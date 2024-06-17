 --Load file contents into a table
Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'C:\src_ctt\SSOT\ssot_nocs.json', SINGLE_CLOB) import
SELECT * Into #TempOccupations
FROM OPENJSON (@JSON)
WITH 
(
    [noc_2021] varchar(10), 
    [label] varchar(50) 
)

INSERT INTO Occupations(NOC, Title) 
Select noc_2021, label from #TempOccupations;

Drop table #TempOccupations

Select * from Occupations
