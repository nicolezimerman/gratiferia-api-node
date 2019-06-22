USE [APITP2]
GO

/****** Object:  Table [dbo].[publications]    Script Date: 22/6/2019 15:21:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[publications](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [varchar](50) NOT NULL,
	[description] [text] NOT NULL,
	[category] [varchar](50) NOT NULL,
	[zone] [varchar](50) NULL,
	[keyword] [varchar](50) NOT NULL,
	[state] [char](10) NOT NULL,
	[owner] [int] NOT NULL,
	[reservedby] [int] NULL,
	[image] [int] NULL,
 CONSTRAINT [PK_publication] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[publications]  WITH CHECK ADD  CONSTRAINT [FK_publications_images] FOREIGN KEY([image])
REFERENCES [dbo].[images] ([id])
GO

ALTER TABLE [dbo].[publications] CHECK CONSTRAINT [FK_publications_images]
GO

ALTER TABLE [dbo].[publications]  WITH CHECK ADD  CONSTRAINT [FK_publications_users] FOREIGN KEY([owner])
REFERENCES [dbo].[users] ([id])
GO

ALTER TABLE [dbo].[publications] CHECK CONSTRAINT [FK_publications_users]
GO

ALTER TABLE [dbo].[publications]  WITH CHECK ADD  CONSTRAINT [FK_publications_users1] FOREIGN KEY([reservedby])
REFERENCES [dbo].[users] ([id])
GO

ALTER TABLE [dbo].[publications] CHECK CONSTRAINT [FK_publications_users1]
GO


