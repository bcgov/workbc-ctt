--Load file contents into a temp table
Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'C:\src_ctt\SSOT\wages.json', SINGLE_CLOB) import
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

--Update the SalaryRangeId column in Occupations table from the salary range in Salaries table.
Update Occupations Set SalaryRangeId = (
Select Id from Salaries where TRY_CAST (Income AS decimal(20,4)) BETWEEN Salaries.Minimum AND Salaries.Maximum
)

--Update the SalaryRangeId column in Occupations table for the salary range of > 125K.
Update Occupations Set SalaryRangeId = 7
where Income > 125000.0000

--Check results
Select * from Occupations
