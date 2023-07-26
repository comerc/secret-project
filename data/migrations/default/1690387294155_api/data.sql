SET check_function_bodies = false;
COPY public.attachments (id, "idCard", bytes, date, "edgeColor", "idMember", "isUpload", "mimeType", name, url, pos, "fileName") FROM stdin;
640372e167ae50004d81cf9f	63eb88d1087a36a92c3bd5a0	80575.0	2023-03-04 16:33:37+00		5612364666dac1cae4dc38b1	t	image/png	transparent1.png	https://trello.com/1/cards/63eb88d1087a36a92c3bd5a0/attachments/640372e167ae50004d81cf9f/download/transparent1.png	229376.0	transparent1.png
63f786f6a1611b8cf298bffc	63eb88d1087a36a92c3bd5a0	46794.0	2023-02-23 15:32:06+00	#040404	5612364666dac1cae4dc38b1	t	image/png	Screen Shot 2023-02-23 at 18.31.57.png	https://trello.com/1/cards/63eb88d1087a36a92c3bd5a0/attachments/63f786f6a1611b8cf298bffc/download/Screen_Shot_2023-02-23_at_18.31.57.png	163840.0	Screen_Shot_2023-02-23_at_18.31.57.png
63f7389c463e5e2807e0523b	63eb88d1087a36a92c3bd5a0	8502.0	2023-02-23 09:57:48+00		5612364666dac1cae4dc38b1	t	image/png	Untitled.png	https://trello.com/1/cards/63eb88d1087a36a92c3bd5a0/attachments/63f7389c463e5e2807e0523b/download/Untitled.png	147456.0	Untitled.png
63f737928635e262522a0db2	63eb88d1087a36a92c3bd5a0	1910476.0	2023-02-23 09:53:22+00	#bd3eab	5612364666dac1cae4dc38b1	t	image/png	Screen Shot 2023-02-22 at 12.07.40 (5).png	https://trello.com/1/cards/63eb88d1087a36a92c3bd5a0/attachments/63f737928635e262522a0db2/download/Screen_Shot_2023-02-22_at_12.07.40_(5).png	131072.0	Screen_Shot_2023-02-22_at_12.07.40_(5).png
63f72fd49923d1be33dd1303	63eb88d1087a36a92c3bd5a0	17622.0	2023-02-23 09:20:20+00	#fcfcfc	5612364666dac1cae4dc38b1	t	image/png	зёбра	https://trello.com/1/cards/63eb88d1087a36a92c3bd5a0/attachments/63f72fd49923d1be33dd1303/download/Screen_Shot_2023-02-22_at_12.04.52.png	98304.0	Screen_Shot_2023-02-22_at_12.04.52.png
63f63a215a470316e3a5417a	63eb88d1087a36a92c3bd5a0	1512.0	2023-02-22 15:52:01+00		5612364666dac1cae4dc38b1	t	text/javascript	tailwind.config.js	https://trello.com/1/cards/63eb88d1087a36a92c3bd5a0/attachments/63f63a215a470316e3a5417a/download/tailwind.config.js	81920.0	tailwind.config.js
63f63a1225083f49e6be7b3f	63eb88d1087a36a92c3bd5a0	153.0	2023-02-22 15:51:46+00		5612364666dac1cae4dc38b1	t	text/javascript	postcss.config.js 111	https://trello.com/1/cards/63eb88d1087a36a92c3bd5a0/attachments/63f63a1225083f49e6be7b3f/download/postcss.config.js	65536.0	postcss.config.js
63f639f7ff4ff84298918f8e	63eb88d1087a36a92c3bd5a0	844.0	2023-02-22 15:51:19+00		5612364666dac1cae4dc38b1	t	application/json	tsconfig.json	https://trello.com/1/cards/63eb88d1087a36a92c3bd5a0/attachments/63f639f7ff4ff84298918f8e/download/tsconfig.json	36864.0	tsconfig.json
63f639e7ecb32352020da967	63eb88d1087a36a92c3bd5a0	1080.0	2023-02-22 15:51:03+00		5612364666dac1cae4dc38b1	t	application/octet-stream	LICENSE	https://trello.com/1/cards/63eb88d1087a36a92c3bd5a0/attachments/63f639e7ecb32352020da967/download/LICENSE	32768.0	LICENSE
63eb890a7b803a03ba48dea2	63eb88d1087a36a92c3bd5a0	1543680.0	2023-02-14 13:13:46+00	#854dc1	5612364666dac1cae4dc38b1	t	image/png	title title title title title title title title Screen Shot 2023-02-14 at 12.04.09.png	https://trello.com/1/cards/63eb88d1087a36a92c3bd5a0/attachments/63eb890a7b803a03ba48dea2/download/Screen_Shot_2023-02-14_at_12.04.09.png	40960.0	Screen_Shot_2023-02-14_at_12.04.09.png
\.
COPY public."boardBackgrounds" (id, brightness, "bottomColor", "topColor", "fullSizeUrl", tile, type, attribution, color, emoji) FROM stdin;
orange-blur	dark	#C04643	#C04643	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/orange-blur.png	f	premium	\N	\N	\N
purple-blur	dark	#8B3EB1	#8B3EB1	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/purple-blur.png	f	premium	\N	\N	\N
bricks	dark	#7F9FB1	#7F9FB1	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/bricks.png	t	premium	\N	\N	\N
wave	dark	#92A9B8	#92A9B8	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/wave.png	t	premium	\N	\N	\N
hex	dark	#8AB362	#8AB362	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/hex.png	t	premium	\N	\N	\N
red-sweater	dark	#623430	#623430	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/red-sweater.png	t	premium	"{\\"url\\":\\"http://subtlepatterns.com/wild-oliva/\\",\\"name\\":\\"Badhon Ebrahim\\",\\"license\\":\\"http://creativecommons.org/licenses/by/2.0/deed.en\\"}"	\N	\N
subtle-irongrip	dark	#454545	#454545	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/subtle-irongrip.png	t	premium	"{\\"url\\":\\"http://subtlepatterns.com/iron-grip/\\",\\"name\\":\\"Tony Kinard\\",\\"license\\":\\"http://creativecommons.org/licenses/by/2.0/deed.en\\"}"	\N	\N
purty_wood_dark	dark	#D09F59	#D09F59	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/purty_wood_dark.png	t	premium	"{\\"url\\":\\"http://subtlepatterns.com/purty-wood/\\",\\"name\\":\\"Richard Tabor\\",\\"license\\":\\"http://creativecommons.org/licenses/by/2.0/deed.en\\"}"	\N	\N
river	dark	#AD9A89	#AD9A89	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/river/full.jpg	f	premium	"{\\"url\\":\\"http://www.flickr.com/photos/22746515@N02/3114276532/\\",\\"name\\":\\"Bert Kaufmann\\",\\"license\\":\\"http://creativecommons.org/licenses/by/2.0/deed.en\\"}"	\N	\N
ocean	dark	#2C457B	#2C457B	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/ocean/full.jpg	f	premium	"{\\"url\\":\\"http://www.flickr.com/photos/mattphipps/4635112852/\\",\\"name\\":\\"MattJP\\",\\"license\\":\\"http://creativecommons.org/licenses/by/2.0/deed.en\\"}"	\N	\N
canyon	dark	#F8B368	#F8B368	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/canyon/full.jpg	f	premium	"{\\"url\\":\\"http://www.flickr.com/photos/wolfgangstaudt/2252688630/\\",\\"name\\":\\"Wolfgang Staudt\\",\\"license\\":\\"http://creativecommons.org/licenses/by/2.0/deed.en\\"}"	\N	\N
city	dark	#3B3B3B	#3B3B3B	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/city/full.jpg	f	premium	"{\\"url\\":\\"http://www.flickr.com/photos/nosha/2907855809/\\",\\"name\\":\\"Nathan Siemers\\",\\"license\\":\\"http://creativecommons.org/licenses/by/2.0/deed.en\\"}"	\N	\N
snow-bokeh	dark	#605784	#605784	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/snow-bokeh/full.jpg	f	premium	"{\\"url\\":\\"http://www.flickr.com/photos/tabor-roeder/5337595458/\\",\\"name\\":\\"Phil Roeder\\",\\"license\\":\\"http://creativecommons.org/licenses/by/2.0/deed.en\\"}"	\N	\N
dew	light	#FBE4D4	#FBE4D4	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/dew/full.jpg	f	premium	"{\\"url\\":\\"http://www.flickr.com/photos/jenny-pics/5584430423/\\",\\"name\\":\\"Jenny Downing\\",\\"license\\":\\"http://creativecommons.org/licenses/by/2.0/deed.en\\"}"	\N	\N
rain	dark	#010E2E	#010E2E	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/rain/full.jpg	f	premium	"{\\"url\\":\\"http://www.flickr.com/photos/vinothchandar/5243641910/\\",\\"name\\":\\"Vinoth Chandar\\",\\"license\\":\\"http://creativecommons.org/licenses/by/2.0/deed.en\\"}"	\N	\N
cosmos	dark	#1D3454	#1D3454	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/cosmos/full.jpg	f	premium	"{\\"url\\":\\"http://www.flickr.com/photos/gsfc/6945160410/\\",\\"name\\":\\"NASA Goddard Space Flight Center\\",\\"license\\":\\"http://creativecommons.org/licenses/by/2.0/deed.en\\"}"	\N	\N
mountain	light	#DFE8E7	#DFE8E7	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/mountain/full.jpg	f	premium	"{\\"url\\":\\"http://www.flickr.com/photos/62681247@N00/6575973407/\\",\\"name\\":\\"jqmj (Queralt)\\",\\"license\\":\\"http://creativecommons.org/licenses/by/2.0/deed.en\\"}"	\N	\N
gradient-volcano	dark	#AE2A19	#43290F	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/volcano.svg	f	gradient	\N	#762A14	🌋
gradient-alien	dark	#172B4D	#505F79	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/alien.svg	f	gradient	\N	#374866	👽
gradient-earth	dark	#60C6D2	#1F845A	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/earth.svg	f	gradient	\N	#3FA495	🌎
gradient-flower	dark	#F87462	#E774BB	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/flower.svg	f	gradient	\N	#F488A6	🌸
gradient-peach	dark	#FAA53D	#E34935	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/peach.svg	f	gradient	\N	#EF763A	🍑
gradient-rainbow	dark	#E774BB	#6E5DC6	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/rainbow.svg	f	gradient	\N	#A869C1	🌈
gradient-crystal	dark	#CD519D	#09326C	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/crystal.svg	f	gradient	\N	#674284	🔮
gradient-ocean	dark	#09326C	#0C66E4	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/ocean.svg	f	gradient	\N	#0B50AF	🌊
gradient-snow	dark	#37B4C3	#0C66E4	https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/snow.svg	f	gradient	\N	#228CD5	❄️
grey	dark	\N	\N	\N	f	default	\N	#838C91	\N
sky	dark	\N	\N	\N	f	default	\N	#00AECC	\N
lime	dark	\N	\N	\N	f	default	\N	#4BBF6B	\N
pink	dark	\N	\N	\N	f	default	\N	#CD5A91	\N
purple	dark	\N	\N	\N	f	default	\N	#89609E	\N
red	dark	\N	\N	\N	f	default	\N	#B04632	\N
green	dark	\N	\N	\N	f	default	\N	#519839	\N
orange	dark	\N	\N	\N	f	default	\N	#D29034	\N
blue	dark	\N	\N	\N	f	default	\N	#0079BF	\N
\.
COPY public."boardPrefs" (id, "permissionLevel", "hideVotes", voting, comments, invitations, "selfJoin", "cardCovers", "isTemplate", "cardAging", "calendarFeedEnabled", background, "backgroundColor", "backgroundImage", "backgroundTile", "backgroundBrightness", "backgroundBottomColor", "backgroundTopColor", "canBePublic", "canBeOrg", "canBePrivate", "canInvite") FROM stdin;
5c3b7bed55428850603f04dd	private	f	members	members	members	f	t	f	regular	f	pink	#CD5A91		f	dark	#CD5A91	#CD5A91	t	t	t	t
\.
COPY public."boardStars" ("idBoard", pos, id, "idMember") FROM stdin;
5c3b7bed55428850603f04dd	16384.0	641c9d2bce21b31bfa03788d	5612364666dac1cae4dc38b1
\.
COPY public.boards (id, name, "desc", closed, "idOrganization", pinned, url, "shortUrl", "dateClosed", "idMemberCreator") FROM stdin;
5c3b7bed55428850603f04dd	Minsk 4		f	60c1a4ed2c78c7151f48aa0f	f	https://trello.com/b/qUdxRhIc/minsk-4	https://trello.com/b/qUdxRhIc	\N	5612364666dac1cae4dc38b1
\.
COPY public."cardBadges" (id, location, votes, "viewingMemberVoted", subscribed, "dueComplete", due, description, attachments, comments, "checkItemsChecked", "checkItems", fogbugz, "checkItemsEarliestdue", start) FROM stdin;
5c9bd788d4d0330774090756	f	0.0	f	t	f	2023-07-23 10:01:18+00	f	1.0	3.0	9.0	24.0		2023-07-23 10:01:18+00	2023-07-23 10:01:18+00
63eb88d1087a36a92c3bd5a0	f	0.0	f	t	f	2023-03-24 17:38:00+00	t	10.0	2.0	1.0	4.0		2023-07-23 10:01:18+00	2023-02-27 05:00:10+00
\.
COPY public."cardCovers" (id, "idAttachment", color, size, brightness) FROM stdin;
5c9bd788d4d0330774090756			normal	light
63eb88d1087a36a92c3bd5a0	640372e167ae50004d81cf9f		normal	dark
\.
COPY public."cardLabels" (id, "idLabel") FROM stdin;
63eb88d1087a36a92c3bd5a0	5c3b7beda3a82f4872e3d32f
\.
COPY public."cardMembers" (id, "idMember") FROM stdin;
63eb88d1087a36a92c3bd5a0	5612364666dac1cae4dc38b1
\.
COPY public."cardMembersVoted" (id, "idMember") FROM stdin;
63eb88d1087a36a92c3bd5a0	5612364666dac1cae4dc38b1
\.
COPY public.cards (id, closed, "dueComplete", "dateLastActivity", "desc", due, "dueReminder", email, "idBoard", "idList", "idShort", "manualCoverAttachment", name, pos, "shortLink", "shortUrl", start, subscribed, url, "isTemplate") FROM stdin;
5c9bd788d4d0330774090756	f	f	2023-04-23 21:31:11+00		2023-07-23 10:01:18+00	0.0		5c3b7bed55428850603f04dd	5c3b7c18e4fcbc75a1060207	80.0	t	Прикрутить SlateJS	0.125	3EG0MtTF	https://trello.com/c/3EG0MtTF	2023-07-23 10:01:18+00	t	https://trello.com/c/3EG0MtTF/80-%D0%BF%D1%80%D0%B8%D0%BA%D1%80%D1%83%D1%82%D0%B8%D1%82%D1%8C-slatejs	f
63eb88d1087a36a92c3bd5a0	f	f	2023-05-11 11:19:14+00	Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto quidem aliquid itaque. Enim consequatur adipisci rem quia architecto animi est distinctio pariatur explicabo fugit delectus sit quibusdam facilis necessitatibus rerum ipsam, eligendi velit voluptatem eum aperiam ipsum voluptate quasi amet ex? Illum vero ea magni dolor rem. Nulla molestiae quae, soluta ex nisi magni. Deserunt incidunt commodi eveniet minus minima soluta, consectetur doloremque perferendis eum provident assumenda blanditiis atque, quam quis nobis quibusdam autem voluptates nesciunt temporibus quos qui et officiis libero recusandae? Aspernatur autem voluptates optio doloremque praesentium tenetur rerum perferendis nihil veritatis odio ipsa inventore ipsam porro non dicta iusto animi, sequi illum delectus? Eos, tempora! Consequuntur placeat iure ad? Incidunt a illum ut nemo, deleniti asperiores odio sapiente voluptate suscipit fugit. Distinctio animi error praesentium recusandae repellat qui nemo saepe dignissimos, laudantium veniam architecto, quam eos. Impedit nemo animi recusandae molestias aspernatur necessitatibus atque facere facilis perspiciatis voluptates ullam unde, est esse illo laudantium cumque. Fugit tenetur totam, minus recusandae corporis neque temporibus deserunt, consequuntur in, blanditiis laborum repudiandae placeat deleniti aut repellat suscipit culpa fuga sunt itaque ipsa nisi! Quaerat repellat voluptatum temporibus at dolore rerum, beatae omnis soluta eum officia placeat suscipit possimus aperiam saepe alias obcaecati rem aut recusandae doloremque eos corporis voluptatem nemo fuga. Ipsa, nesciunt eveniet laboriosam quos ab corporis doloribus itaque non repellendus sapiente, maiores magni dolor dolore. Illo magni est odio veniam architecto obcaecati saepe libero earum, dolores asperiores! Possimus temporibus animi facere beatae voluptates perferendis id illum impedit tempore explicabo cum, aperiam placeat! Facere sit fugit veritatis iure eos! Reiciendis maiores nemo neque esse hic ut culpa veritatis nobis doloremque. Distinctio, iure quam suscipit voluptatibus nihil nesciunt quia libero nam ea, ad facilis, assumenda commodi natus atque maiores officia. Sint dignissimos odio vel eaque saepe nihil maxime, voluptatem sapiente molestiae odit eius fugit exercitationem ratione id sed at! Ipsum omnis mollitia voluptatibus fugiat odit architecto magnam doloribus beatae libero maiores aut quia voluptas ut ad repudiandae, accusantium, sunt facilis rem dolorum reprehenderit molestiae similique. Est ratione mollitia provident velit quisquam laborum quo unde quae, sed alias molestias dolorem possimus magni a maiores quaerat minus doloribus quis quidem saepe aperiam? Eaque inventore numquam officiis repudiandae dolor quam esse quasi obcaecati, fugit itaque ut, molestias, voluptates exercitationem nostrum aspernatur. Aliquid fugit molestias itaque nihil nam, laudantium voluptatibus, deserunt, vel maiores autem veniam maxime eum rem dolorum iure? Culpa numquam illum dolore eos voluptatem repudiandae asperiores quos tempora recusandae, dignissimos dolor, atque animi cum fugiat ipsa perferendis. Harum nisi expedita earum minima neque quaerat distinctio est error tenetur? Culpa, eius magni soluta quis in error aperiam dolorem a. Voluptatum, consequatur? Porro fuga placeat repudiandae pariatur esse in corrupti assumenda, eveniet inventore nostrum harum ut ipsam quidem? Mollitia illo facere hic eius ipsum expedita et nulla ad atque dolor repellat recusandae voluptas fuga vero nemo repudiandae a excepturi, iure libero sint perferendis! Distinctio, fugit?	2023-03-24 17:38:00+00	1440.0		5c3b7bed55428850603f04dd	5c3c6d5bf8c2315ac54c6804	190.0	t	111	10239.96875	1wBEXTbO	https://trello.com/c/1wBEXTbO	2023-02-27 05:00:10+00	t	https://trello.com/c/1wBEXTbO/190-111	f
\.
COPY public."checkItems" (id, name, pos, state, due, "dueReminder", "idChecklist") FROM stdin;
5dc38faa764ca6513c54f825	[gitbook](gitbook.com)	100214.0	complete	2023-07-23 10:01:18+00	0.0	5c9e76ef425e5e090d5da132
5dc38296e79e2818b6c0d8d1	edtr.io	83564.0	complete	2023-07-23 10:01:18+00	0.0	5c9e76ef425e5e090d5da132
5ca51a8e5eb82d219467f041	[canner-slate-editor](https://github.com/Canner/canner-slate-editor)	8231.5	complete	2023-07-23 10:01:18+00	0.0	5c9e76ef425e5e090d5da132
5c9e825efc69083e7dcb7bf3	[webiny](https://github.com/Webiny/webiny-js)	28835.0	complete	2023-07-23 10:01:18+00	0.0	5c9e76ef425e5e090d5da132
5c9e7c3f5ab3be8b1806d6d2	[sanity](https://github.com/sanity-io/sanity)	66880.0	complete	2023-07-23 10:01:18+00	0.0	5c9e76ef425e5e090d5da132
5c9e7b9b0c9bd44536a60b90	[netlify-cms-widget-markdown](https://github.com/netlify/netlify-cms/blob/master/packages/netlify-cms-widget-markdown/package.json)	24711.0	complete	2023-07-23 10:01:18+00	0.0	5c9e76ef425e5e090d5da132
5c9e771286fbe28e6345a54b	[outline](https://www.getoutline.com)	32959.0	complete	2023-07-23 10:01:18+00	0.0	5c9e76ef425e5e090d5da132
5c9e76ff33a2d817364b3542	[ory-editor](https://github.com/aeneasr/ory-editor)	16463.0	complete	2023-07-23 10:01:18+00	0.0	5c9e76ef425e5e090d5da132
5ccc413ab4e7613bc50f0bc6	[slate-plugins](https://github.com/ianstormtaylor/slate-plugins)	287997.0	incomplete	2023-07-23 10:01:18+00	0.0	5c9e5e738f69d262a507fafd
5c9e5f6ee59ce32394bb63d2	Versions (?)	270605.0	incomplete	2023-07-23 10:01:18+00	0.0	5c9e5e738f69d262a507fafd
5c9e5f50ea39592c992e184d	Tables	254108.0	incomplete	2023-07-23 10:01:18+00	0.0	5c9e5e738f69d262a507fafd
5c9e5f27d260748683d74bcf	Plugins	236846.0	incomplete	2023-07-23 10:01:18+00	0.0	5c9e5e738f69d262a507fafd
5c9e5f1ae5dca94dab0b01c0	Paste HTML	220202.0	incomplete	2023-07-23 10:01:18+00	0.0	5c9e5e738f69d262a507fafd
5c9e5f1041be95873135d31c	Mentions	203526.0	incomplete	2023-07-23 10:01:18+00	0.0	5c9e5e738f69d262a507fafd
5c9e5f099983176366c8365f	Markdown Shortcuts	186241.0	incomplete	2023-07-23 10:01:18+00	0.0	5c9e5e738f69d262a507fafd
5c9e5efecb12442b7ca06bd4	Markdown Preview	169795.0	incomplete	2023-07-23 10:01:18+00	0.0	5c9e5e738f69d262a507fafd
5c9e5ef61c833711b6367cac	Links	153240.0	incomplete	2023-07-23 10:01:18+00	0.0	5c9e5e738f69d262a507fafd
5c9e5ee966b8398d37e02b56	Images	136577.0	incomplete	2023-07-23 10:01:18+00	0.0	5c9e5e738f69d262a507fafd
5c9e5edb2a0334688fe79042	Hovering Menu	120029.0	incomplete	2023-07-23 10:01:18+00	0.0	5c9e5e738f69d262a507fafd
5c9e5ecd906f140897ef3775	History	102874.0	incomplete	2023-07-23 10:01:18+00	0.0	5c9e5e738f69d262a507fafd
5c9e5ec110809635b3b6d2ca	Emojis	85576.0	incomplete	2023-07-23 10:01:18+00	0.0	5c9e5e738f69d262a507fafd
5c9e5eb8f257c880eee4f74a	Embeds	68701.0	incomplete	2023-07-23 10:01:18+00	0.0	5c9e5e738f69d262a507fafd
5c9e5e9a9eea7083b1a92bce	Code Highlighting	34559.0	incomplete	2023-07-23 10:01:18+00	0.0	5c9e5e738f69d262a507fafd
5c9e5e7504687776b48d34ab	Check Lists	17319.0	complete	2023-07-23 10:01:18+00	0.0	5c9e5e738f69d262a507fafd
\.
COPY public.checklists (id, name, "idCard", pos) FROM stdin;
5c9e76ef425e5e090d5da132	Заимствовать из проектов	5c9bd788d4d0330774090756	32768.0
5c9e5e738f69d262a507fafd	Перенести функционал	5c9bd788d4d0330774090756	16384.0
\.
COPY public."customBoardBackgrounds" (id, "idMember", brightness, "bottomColor", "topColor", "fullSizeUrl", tile, type) FROM stdin;
573dfe178a61bc2841c60bf1	5612364666dac1cae4dc38b1	dark			https://trello-backgrounds.s3.amazonaws.com/5612364666dac1cae4dc38b1/1024x681/ef273732cb73635b843c30d199ba6565/0_c1bc5_8f7e91f_XXL.jpg	f	custom
573dfe162e3ee151900348b7	5612364666dac1cae4dc38b1	dark			https://trello-backgrounds.s3.amazonaws.com/5612364666dac1cae4dc38b1/1024x681/00e28185a84c76b19c229df0b5f25e1b/0_c1b4a_de06d3c9_XXL.jpg	f	custom
573dfe15f8306a3567e9fdb1	5612364666dac1cae4dc38b1	dark	#3e2c1c	#72504a	https://trello-backgrounds.s3.amazonaws.com/5612364666dac1cae4dc38b1/1024x681/6eb4137534df6b2d616d28c53be2da35/0_114244_b99b6c0a_XXL.jpg	f	custom
573dfe11e1d33db16a7c11c1	5612364666dac1cae4dc38b1	dark			https://trello-backgrounds.s3.amazonaws.com/5612364666dac1cae4dc38b1/1024x681/3013a0fca60540424d2d276be9bd7a00/0_114252_22fd2d91_XXL.jpg	f	custom
573dfe0ff9b2755d02663aa9	5612364666dac1cae4dc38b1	dark	#201916	#7a4953	https://trello-backgrounds.s3.amazonaws.com/5612364666dac1cae4dc38b1/1024x684/b10f640c8b837ef3980cb6a7a034f3c0/0_e2389_f15b79f8_XXL.jpg	f	custom
573dfe0e8f6de9246b59a6b9	5612364666dac1cae4dc38b1	dark	#2f2926	#c9bfb2	https://trello-backgrounds.s3.amazonaws.com/5612364666dac1cae4dc38b1/1024x681/5c65b9b2a325a773829fcd412535330b/0_e321a_2948bbc_XXL.jpg	f	custom
573dfe0c586704aa6620907f	5612364666dac1cae4dc38b1	dark			https://trello-backgrounds.s3.amazonaws.com/5612364666dac1cae4dc38b1/1024x684/ca7ad1855c687b6c2047ca4cee2eaf97/0_c1bc6_39c3ee76_XXL.jpg	f	custom
573dfe06425e1693f384159e	5612364666dac1cae4dc38b1	light			https://trello-backgrounds.s3.amazonaws.com/5612364666dac1cae4dc38b1/1024x681/ba09c221d3355c43112be2c2c5750143/0_117830_b014232_XXL.jpg	f	custom
573dfe04155034aafe914369	5612364666dac1cae4dc38b1	light	#3f3722	#6d7b98	https://trello-backgrounds.s3.amazonaws.com/5612364666dac1cae4dc38b1/1024x681/08e1b6061da2aa1775020b3e760b8d54/0_117833_95cc9102_XXL.jpg	f	custom
\.
COPY public."customEmojis" (id, "idMember", url, name) FROM stdin;
5abbe4b7ddc1b351ef961414	5612364666dac1cae4dc38b1	https://trello-emoji.s3.amazonaws.com/5589c3ea49b40cedc28cf70e/b40d9925f4e75495104b5e560881d8e4/chorizo.png	chorizo
\.
COPY public."customStickers" (id, "idMember", url) FROM stdin;
5abbe4b7ddc1b351ef961414	5612364666dac1cae4dc38b1	
\.
COPY public.labels (id, "idBoard", name, color) FROM stdin;
5c3b7beda3a82f4872e3d32e	5c3b7bed55428850603f04dd	4-2	red
5c3b7beda3a82f4872e3d335	5c3b7bed55428850603f04dd	1-5	blue
5c3b7beda3a82f4872e3d32f	5c3b7bed55428850603f04dd	ready	green
\.
COPY public.lists (id, name, closed, "idBoard", pos, subscribed, "softLimit") FROM stdin;
5c3b7c18e4fcbc75a1060207	In Progress	f	5c3b7bed55428850603f04dd	360447.0	f	
5c3b7c6139f45536ab56189a	Done	f	5c3b7bed55428850603f04dd	294911.0	f	
5c3b7c0eed8b758e0ec8d09d	To Do	f	5c3b7bed55428850603f04dd	229375.0	f	
5c3c6d5bf8c2315ac54c6804	Backlog	f	5c3b7bed55428850603f04dd	65535.625	f	
5c3b7c8381d55f8e11f3acdb	Hold	f	5c3b7bed55428850603f04dd	32767.8125	f	
\.
COPY public."memberPrefs" (id, locale, "colorBlind", "minutesBeforeDeadlineToNotify", "minutesBetweenSummaries", "sendSummaries") FROM stdin;
5612364666dac1cae4dc38b1	ru	f	1440.0	-1.0	t
\.
COPY public.members (id, "activityBlocked", "avatarHash", "avatarUrl", bio, confirmed, "fullName", "idMemberReferrer", initials, "memberType", "nonPublicAvailable", url, username, status, "avatarSource", "credentialsRemovedCount", email, "gravatarHash", "loginTypes", "oneTimeMessagesDismissed", "uploadedAvatarHash", "uploadedAvatarUrl", "premiumFeatures", "ixUpdate") FROM stdin;
5612364666dac1cae4dc38b1	f	790db9a7a63dfbe6de8014743e636e10	https://trello-members.s3.amazonaws.com/5612364666dac1cae4dc38b1/790db9a7a63dfbe6de8014743e636e10		t	andrew_kachanov		A	normal	t	https://trello.com/andrewkachanov	andrewkachanov	disconnected	none	1.0	andrew.kachanov@gmail.com	4787ec7420cac3f90338c2c286df857e	"[\\"google\\",\\"android\\",\\"atlassian\\",\\"password\\"]"	"[\\"new-lang-ru\\",\\"PowerUpsPaneExplainer\\",\\"GoldIntro\\",\\"OPEN_CARD_TIP\\",\\"simplified-view-full-view\\",\\"simplified-view-org-settings\\",\\"simplified-view-card-activity\\",\\"simplified-view-card-move\\",\\"simplified-view-labels-and-edit\\",\\"close-menu-of-first-board\\",\\"notifications-onboarding\\",\\"board-background-prompt\\",\\"free-trial-banner-60c1a4ed2c78c7151f48aa0f\\",\\"your-items-on-home\\",\\"ack-new-feature-CrossProductSearch-1678827600000\\",\\"ack-new-feature-ThemeSwitcherSpotlight-1733000400000\\",\\"ack-new-feature-DarkModeSpotlight-1688158800000\\"]"			"[\\"additionalBoardBackgrounds\\",\\"additionalStickers\\",\\"customBoardBackgrounds\\",\\"customEmojis\\",\\"customStickers\\",\\"plugins\\"]"	841
\.
COPY public.memberships (id, "idMember", "idBoard", "memberType", unconfirmed, deactivated) FROM stdin;
5c3b7bed55428850603f04de	5612364666dac1cae4dc38b1	5c3b7bed55428850603f04dd	admin	f	f
\.
COPY public.notifications (id, "idCard", unread, type, date, "dateRead", data, "idMemberCreator", "idAction") FROM stdin;
5dc591ac425f2a223aba0a8e	63eb88d1087a36a92c3bd5a0	t	cardDueSoon	2019-11-08 16:02:52+00	2023-07-23 10:01:18+00		5abbe4b7ddc1b351ef961414	5abbe4b7ddc1b351ef961414
\.
COPY public."organizationPrefs" (id, "permissionLevel", "boardInviteRestrict", "externalMembersDisabled", "associatedDomain", "googleAppsVersion") FROM stdin;
60c1a4ed2c78c7151f48aa0f	private	any	f		1.0
\.
COPY public.organizations (id, "creationMethod", name, "displayName", "desc", "idMemberCreator", invited, "membersCount", "billableMemberCount", "billableCollaboratorCount", url, website, "logoHash", "logoUrl", "premiumFeatures", "ixUpdate", "dateLastActivity") FROM stdin;
60c1a4ed2c78c7151f48aa0f	teamify-auto	user81925824	Andrew Kachanov: рабочее пространство		5612364666dac1cae4dc38b1	f	1.0	1.0	1.0	https://trello.com/w/user81925824				"[\\"additionalBoardBackgrounds\\",\\"additionalStickers\\",\\"customBoardBackgrounds\\",\\"customEmojis\\",\\"customStickers\\",\\"plugins\\"]"	15	2023-07-20 12:48:41+00
\.
COPY public."savedSearches" (id, "idMember", name, query, pos) FROM stdin;
5abbe4b7ddc1b351ef961414	5612364666dac1cae4dc38b1	My Cards	@me	top
\.
COPY public.stickers (id, "idCard", top, "left", "zIndex", rotate, image, "imageUrl") FROM stdin;
64b92c4c78633d1943b73104	63eb88d1087a36a92c3bd5a0	51.246780218742835	2.642276422764228	3.0	9.0	heart	https://d2k1ftgv7pobq7.cloudfront.net/images/stickers/heart.png
\.
COPY public."tokenPermissions" (id, "idModel", "modelType", read, write) FROM stdin;
5abbe4b7ddc1b351ef961414	5abbe4b7ddc1b351ef961414	board	t	t
\.
COPY public.tokens (id, identifier, "idMember", "dateCreated", "dateExpires") FROM stdin;
5abbe4b7ddc1b351ef961414	App Name	5abbe4b7ddc1b351ef961414	2019-10-16 14:27:17+00	2023-07-23 10:01:18+00
\.
