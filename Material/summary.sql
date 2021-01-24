USE master
DROP DATABASE IF EXISTS javaflorist;
GO
CREATE DATABASE javaflorist;
GO
USE [javaflorist];

CREATE TABLE [user] (
  [id] int NOT NULL IDENTITY,
  [active] int NOT NULL DEFAULT '1',
  [email] varchar(255) NOT NULL,
  [password] varchar(255) NOT NULL,
  [username] varchar(255) NOT NULL,
  [role] varchar(255) NOT NULL DEFAULT 'customer',
  [address] varchar(255) DEFAULT NULL,
  [birthday] datetime DEFAULT NULL,
  [name] varchar(255) DEFAULT NULL,
  [phonenumber] varchar(255) DEFAULT NULL,
  [imgName] varchar(1000) DEFAULT NULL,
  PRIMARY KEY ([id])
);

CREATE TABLE [product] (
  [id] int NOT NULL IDENTITY,
  [name] varchar(255) NOT NULL,
  [price] float NOT NULL,
  [description] varchar(500) NOT NULL,
  [active] int NOT NULL DEFAULT '1',
  [imgName] varchar(255) DEFAULT NULL,
  PRIMARY KEY ([id])
);

CREATE TABLE [order] (
  [id] int NOT NULL IDENTITY PRIMARY KEY,
  [address] varchar(70) NOT NULL,
  [date] datetime NOT NULL,
  [deliverydate] datetime DEFAULT NULL,
  [email] varchar(255) NOT NULL,
  [note] varchar(200) DEFAULT NULL,
  [paymentmethod] varchar(255) NOT NULL,
  [phonenumber] varchar(255) NOT NULL,
  [message] varchar(255) NOT NULL,
  [receiver] varchar(255) NOT NULL,
  [status] varchar(255) NOT NULL DEFAULT 'processing',
  [totalmoney] float NOT NULL,
  [userid] int NOT NULL FOREIGN KEY REFERENCES [user](id)
);
CREATE TABLE [orderdetail] (
  [id] int NOT NULL IDENTITY PRIMARY KEY,
  [quantity] int NOT NULL,
  [orderid] int NOT NULL FOREIGN KEY REFERENCES [order](id),
  [productid] int NOT NULL FOREIGN KEY REFERENCES [product](id)
);

CREATE TABLE [cart] (
  [id] int NOT NULL IDENTITY PRIMARY KEY,
  [userid] int UNIQUE FOREIGN KEY REFERENCES [user](id)
);

CREATE TABLE [cartdetail] (
  [id] int NOT NULL IDENTITY PRIMARY KEY,
  [quanity] int NOT NULL,
  [cartid] int NOT NULL FOREIGN KEY REFERENCES [cart](id),
  [productid] int NOT NULL FOREIGN KEY REFERENCES [product](id),
);

CREATE TABLE [category] (
  [id] int NOT NULL IDENTITY,
  [categoryname] varchar(255) NOT NULL UNIQUE,
  [message] varchar(8000) NOT NULL,
  [active] int NOT NULL DEFAULT '1',
  PRIMARY KEY ([id])
);

CREATE TABLE [productcategory] (
  [productid] int NOT NULL FOREIGN KEY REFERENCES [product](id),
  [categoryname] varchar(255) NOT NULL FOREIGN KEY REFERENCES [category](categoryname)
);

CREATE TABLE [favorite] (
  [userid] int NOT NULL,
  [productid] int NOT NULL FOREIGN KEY REFERENCES [product](id)
);

CREATE TABLE [feedbackdata] (
  [id] int NOT NULL IDENTITY, 
  [userid] int NOT NULL FOREIGN KEY REFERENCES [user](id),
  [productid] int NOT NULL FOREIGN KEY REFERENCES [product](id),
  [feedback] varchar(8000) NOT NULL,
  [fbReply] varchar(8000) NOT NULL,
  [vote] int NOT NULL
  PRIMARY KEY ([id])
);

CREATE TABLE [contact] (
  [id] int NOT NULL IDENTITY(1,1), 
  [name] varchar(255) NOT NULL,
  [email] varchar(255) NOT NULL,
  [message] varchar(255) NOT NULL,
  PRIMARY KEY ([id])
);


-- Product
USE [javaflorist]
GO
SET IDENTITY_INSERT [dbo].[product] ON 

INSERT [dbo].[product] ([id], [name], [price], [description], [imgName]) VALUES (5, N'Heartfelt Luxury Rose Bouquet', 25, N'Picked fresh from the farm to offer your special recipient a gift straight from the heart, our stunning Red Rose Bouquet is a classic romantic gesture that will have them falling head over heels in love with each exquisite bloom', N'903799212044465.jpg')
INSERT [dbo].[product] ([id], [name], [price], [description], [imgName]) VALUES (18, N'The Joyful Inspirations', 27, N'FTD® proudly presents the Joyful Inspirations Bouquet. The uplifting color of the skies are set to brighten their day with fresh radiance with this bouquet of light blue hydrangea simply set in a modern clear glass vase to create an expression of your warmest sentiments.', N'joyful-ins212943255.jpg')
INSERT [dbo].[product] ([id], [name], [price], [description], [imgName]) VALUES (19, N'Colorful Connection Bouquet', 35, N'The Colorful Connection Bouquet is an unforgettable way to join in your special recipient''s most memorable moments. ', N'photo-1458213200585.jpg')
INSERT [dbo].[product] ([id], [name], [price], [description], [imgName]) VALUES (21, N'Hand-Tied Soft & Lush', 17, N'This is a classic white hand tied bouquet with a touch of pink giving a soft & subtle style.   May come with different wrapping paper.', N'PXL_202012213711243.jpg')
INSERT [dbo].[product] ([id], [name], [price], [description], [imgName]) VALUES (22, N'The Perfect Day Bouquet', 43, N'The Perfect Day Bouquet extends warmth and sunlit cheer through the beauty of roses and Oriental lilies to wish your special recipient a day like none other!', N'14-M7E_600213952128.jpg')
INSERT [dbo].[product] ([id], [name], [price], [description], [imgName]) VALUES (23, N'Teleflora''s Wrapped with Passion Bouquet', 57, N'Long stemmed red roses, pink stargazer lilies and dark pink alstroemeria are artistically arranged with lavender wax flower and lemon leaf. Delivered in a Wrapped With Passion keepsake vase.', N'wrapped-wi214124894.jpg')
INSERT [dbo].[product] ([id], [name], [price], [description], [imgName]) VALUES (24, N'Beautiful Blue Watering Can Arrangement', 34, N'Designer''s choice watering can arrangement made with daisies, mini roses, mums and greens.  The utmost care and attention is given to your order to ensure that it is as similar as possible to the requested item. ', N'465fef6b-c214255796.jpg')
INSERT [dbo].[product] ([id], [name], [price], [description], [imgName]) VALUES (25, N'Cloud Nine', 34, N'Enjoy the highest highs of love on Cloud Nine with this unique arrangement in reds and whites. Roses, gerbera daisies, miniature carnations, white hydrangea and greenery for your one and only on Valentine''s Day.', N'cloud-nine214420806.jpg')
INSERT [dbo].[product] ([id], [name], [price], [description], [imgName]) VALUES (26, N'Heaven Breeze Vase Arrangement', 49, N'Designer''s Choice vase arrangement made with hydrangea, mums, roses, lisianthus and blue thistle.', N'06fba7ae-f214607680.jpg')
INSERT [dbo].[product] ([id], [name], [price], [description], [imgName]) VALUES (27, N'Martita''s Spring Basket', 37, N'Martita''s Spring Basket made with ranunculus, anemone, tulips, solidago, blue thistle and Queen Annes.', N'0600435a-4214651406.jpg')
INSERT [dbo].[product] ([id], [name], [price], [description], [imgName]) VALUES (28, N'Sally Bouquet', 31, N'Hydrangeas, roses, Lizzie''s and snaps! ', N'IMG_202007214857702.jpg')
INSERT [dbo].[product] ([id], [name], [price], [description], [imgName]) VALUES (29, N'Hand-Tied Red & White Bouquet', 38, N'Cut flowers - No vase.', N'PXL_202012214955142.jpg')
INSERT [dbo].[product] ([id], [name], [price], [description], [imgName]) VALUES (30, N'White Blush Vase Arrangement', 57, N'Mixed with some dry floral.', N'fe3f7d14-c215217410.jpg')
INSERT [dbo].[product] ([id], [name], [price], [description], [imgName]) VALUES (31, N'Season of Love Tulip Bouquet', 41, N'Capture her heart this Valentine''s Day with assorted blushing pink tulips presented in an FTD shining heart-shaped ceramic vase with a reflective metallic finish.', N'20-pink-tu215534098.jpg')
INSERT [dbo].[product] ([id], [name], [price], [description], [imgName]) VALUES (32, N'Breathtaking Ombre Bouquet', 68, N'This ombre bouquet includes hot pink roses, red alstroemeria, hot pink miniature carnations, light pink miniature carnations, pink matsumoto asters, huckleberry, and leatherleaf fern. Delivered in an Ooh La Ombre cube.', N'ombre-bouq215739838.jpg')
INSERT [dbo].[product] ([id], [name], [price], [description], [imgName]) VALUES (33, N'Beyond Radiant Bouquet', 67, N'Red roses, pink asiatic lilies, dark pink alstroemeria, red carnations, red miniature carnations and fuchsia stock are arranged in a Radiantly Rouge vase with parvifolia eucalyptus, leatherleaf fern, and lemon leaf.', N'beyond-rad215824965.jpg')
INSERT [dbo].[product] ([id], [name], [price], [description], [imgName]) VALUES (34, N'Sweet & Swooning ™ Bouquet', 48, N'Celebrate a love that is unlike any other with a floral arrangement that stands above the rest. Perfect for friends, family and lovers!', N'Wg8sOEA_10215907066.png')
INSERT [dbo].[product] ([id], [name], [price], [description], [imgName]) VALUES (35, N'Mixed Roses Wrapped Bouquet', 32, N'Turn up the heat on a new romance - or a lifelong love affair - with this premium mixed rose bouquet.', N'Roses_Colo215943901.jpg')
SET IDENTITY_INSERT [dbo].[product] OFF


-- Category
USE [javaflorist]
GO
SET IDENTITY_INSERT [dbo].[product] ON
INSERT [dbo].[category] ([id], [categoryname], [message]) VALUES (1, N'Anniversary', N'Happy anniversary, my love. Thank you for filling my life with so much peace, joy and contentment. I am beyond grateful for all that you’ve done for me.
To my best friend and confidante, happy anniversary! My greatest wish is to experience many more with you.
Let’s celebrate! It’s our anniversary today. Thank you for your role in getting us to this special place. I cherish the relationship we have.
I couldn’t be happier to celebrate our anniversary today. My heart sings with joy knowing how far we’ve come. Thank you for making it so easy.
Thank you for putting up with me all this time. You are such a special human being and I consider myself extremely lucky to be able to celebrate an anniversary with you.
Happy anniversary, my friend! I cherish our special memories and moments together. Thank you for all you do for me.
Congratulations on this anniversary. It is definitely something to be proud about. You have done so well in getting where you are! Continue with the positive attitude, and we will be sure to celebrate many, many more.')
INSERT [dbo].[category] ([id], [categoryname], [message]) VALUES (2, N'Lover', N'I don’t want to set the world on fire I just want to start a flame in your heart.
I wrote your name in the sky but the clouds blew it away. I wrote you name in the sand but the waves washed it away. So I wrote your name in my heart and there it will always stay.
Sorry for embarrassing you at work. I bet your face is as red as these roses!
12 roses I give to you to show you how much I do love you.
I love you with all of my heart.
Roses are red, shamrocks are green - you’ve got the sweetest smile I’ve ever seen!')
INSERT [dbo].[category] ([id], [categoryname], [message]) VALUES (3, N'Birthday', N'On this day, may your most cherished desires come true; I wish you success in life. Happy birthday!
We prayed to God to give us a special gift. He gave us you.  Dear, you are a dream come true. Happy birthday!
Happy birthday! You are my happiness. Your memories bring a smile to my face.  Have a wonderful day
Dear Friend, as you move into another year of your life, may the blessings and success follow you always. Happy birthday!
You are a very special person to me. Hope the New Year will not change but have more memorable moments with you. Happy birthday!')
INSERT [dbo].[category] ([id], [categoryname], [message]) VALUES (4, N'Mother''s Day', N'You are the greatest gift from the heavens mother, filled with love and care for all your children and the entire family. 
Your smile brightens each day just as the morning rays shines on the hills and it’s with doubt that this gives us the courage to face the new day with joy. 
It’s my time to know you that how fortunate and special I am to be blessed with a mother as caring, loving as you. 
Wish you a happy Mother’s Day Mom. I believe in love at the first sight for you are the first person I saw when I opened my eyes and have loved you since that day dear mum. 
Mom, you’ve always been there for me. There’s no way I could ever fully express my gratitude for all you’ve done for me. I love you! Happy Mother’s Day. 
With zeal and courage you have brought and fought for us that we can share in love bound with togetherness. You are so special to us mother.')
INSERT [dbo].[category] ([id], [categoryname], [message]) VALUES (5, N'Special Day', N'And here’s wishing you the very best for all the new ventures, that life has in store for you.
I find my heart singing a chorus at your happy news. Good luck to you during this joyous time.
Keep your best wishes, close to your heart and watch what happens.
Don’t be afraid of moving forward. The future is bright.
Good luck and tons of best wishes. God bless you in whatever you do. This is my heartiest wish just for you.
Here’s wishing you success in everything you do. Good luck.
Success comes only to those who believe in themselves and are prepared to win. Good Luck.
I wish nothing but the best for you.
Moving on to a new stage in life can be a challenging process. We wish you the best of luck in all of your future endeavors, you will be great.')
SET IDENTITY_INSERT [dbo].[category] OFF