USE [APITP2]
GO

/****** Object:  Table [dbo].[users]    Script Date: 22/6/2019 15:21:26 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [char](30) NOT NULL,
	[lastname] [char](30) NOT NULL,
	[age] [int] NOT NULL,
	[email] [varchar](50) NOT NULL,
	[password] [text] NOT NULL,
	[zone] [varchar](50) NULL,
 CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


