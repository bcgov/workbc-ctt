--Load file contents into a temp table
Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'C:\src_ctt_new\SSOT\wages.json', SINGLE_CLOB) import
SELECT * Into #TempWages
FROM OPENJSON (@JSON)
WITH 
(
    noc varchar(100), 
    calculated_median_annual_salary varchar(100) 
)

---Update #TempWages with income as int
Update #TempWages SET calculated_median_annual_salary = CAST((ROUND(CAST (calculated_median_annual_salary AS NUMERIC(20,4)),0)) AS INT)
From #TempWages

--Update new income in Occupations table from temp table
DECLARE @Counter INT , @MaxId INT, 
		@income NVARCHAR(20)
SELECT @Counter = min(Id) , @MaxId = max(Id) 
FROM Occupations

WHILE(@Counter IS NOT NULL
      AND @Counter <= @MaxId)
BEGIN
   Update Occupations SET Income = #TempWages.calculated_median_annual_salary
   FROM #TempWages WHERE Occupations.NOC = #TempWages.noc
    
   SET @Counter  = @Counter  + 1        
END

--Drop temp table
Drop table #TempWages

------------------------------------------------------------------------------------------------------------
--Update the SalaryRangeId based on Income change.
--Added 2 new columns Minimum and Maximum for each salary range in Salaries table.
IF NOT EXISTS (SELECT 1
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE upper(TABLE_NAME) = 'Salaries'
        AND upper(COLUMN_NAME) = 'Minimum')
BEGIN
    ALTER TABLE [dbo].[Salaries] ADD Minimum decimal(20,4)
END
GO
IF NOT EXISTS (SELECT 1
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE upper(TABLE_NAME) = 'Salaries'
        AND upper(COLUMN_NAME) = 'Maximum')
BEGIN
    ALTER TABLE [dbo].[Salaries] ADD Maximum decimal(20,4)
END
GO

--Updated the values in the 2 new columns Minimum and Maximum for each salary range in Salaries table.
Update Salaries SET Minimum = 11000, Maximum = 33000
where Id=1

Update Salaries SET Minimum = 33001, Maximum = 44000
where Id=2

Update Salaries SET Minimum = 44001, Maximum = 53000
where Id=3

Update Salaries SET Minimum = 53001, Maximum = 66000
where Id=4

Update Salaries SET Minimum = 66001, Maximum = 95000
where Id=5

Update Salaries SET Minimum = 95001, Maximum = 125000
where Id=6

Update Salaries SET Minimum = 125001, Maximum = null
where Id=7

--Updated the SalaryRangeId column in Occupations table from the salary range in Salaries table.
Update Occupations Set SalaryRangeId = (
Select Id from Salaries where TRY_CAST (Income AS decimal(20,4)) BETWEEN Salaries.Minimum AND Salaries.Maximum
)
--Updated the SalaryRangeId column in Occupations table for the salary range of > 125K.
Update Occupations Set SalaryRangeId = 7
where Income > 125000.0000

--Drop temp table
Drop table #TempWages

--Check results
Select * from Occupations

