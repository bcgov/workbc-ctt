--Load file contents into a temp table
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

--Resetting Occupations table's id column
DBCC CHECKIDENT ('dbo.Occupations', RESEED, 0);

--Insert Occupations table records from temp table
INSERT INTO Occupations(NOC, Title) 
Select noc_2021, label from #TempOccupations;

--Drop temp table
Drop table #TempOccupations

--Check results
Select * from Occupations
