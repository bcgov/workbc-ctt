--USE [TransferableSkillsTool]
--GO

IF OBJECT_ID('dbo.[FK_CommonJobTitles_Occupations]', 'C') IS NOT NULL
BEGIN
	ALTER TABLE [dbo].[CommonJobTitles] DROP CONSTRAINT [FK_CommonJobTitles_Occupations]
END
GO

DROP TABLE IF EXISTS [dbo].[CommonJobTitles]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CommonJobTitles](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OccupationId] [int] NOT NULL,
	[JobTitle] [varchar](500) NOT NULL,
 CONSTRAINT [PK_CommonJobTitles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[CommonJobTitles]  WITH CHECK ADD  CONSTRAINT [FK_CommonJobTitles_Occupations] FOREIGN KEY([OccupationId])
REFERENCES [dbo].[Occupations] ([Id])
GO

ALTER TABLE [dbo].[CommonJobTitles] CHECK CONSTRAINT [FK_CommonJobTitles_Occupations]
GO
