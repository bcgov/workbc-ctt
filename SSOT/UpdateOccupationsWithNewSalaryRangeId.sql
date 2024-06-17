--Added 2 new columns Minimum and Maximum for each salary range in Salaries table.
ALTER TABLE Salaries
ADD Minimum decimal(20,4);

ALTER TABLE Salaries
ADD Maximum decimal(20,4);

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

Update Occupations Set SalaryRangeId = 7
where Income > 125000.0000

Select * from Occupations



