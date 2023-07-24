SET check_function_bodies = false;
COPY public.users (id, name, email, "emailVerified", image) FROM stdin;
73c19916-1613-4996-a695-f11ac1102478	#кодеротбога	\N	\N	https://avatars.githubusercontent.com/u/1025241?v=4
\.
COPY public.accounts (id, type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state, oauth_token_secret, oauth_token, "userId", refresh_token_expires_in) FROM stdin;
8aad15e4-b07f-41ba-b51e-12edb022d189	oauth	github	1025241	ghr_66zr3xjYEAcJnndng5fJ7E8oIysomyZWsY6OOdpAIhenzRl3Wnb8wldlYUPagXUCkaFarH2ogO90	ghu_RFI39ApAiPIUvtm4D09PO5Eq90aiHD3BirPM	1671676435	bearer		\N	\N	\N	\N	73c19916-1613-4996-a695-f11ac1102478	15724800
\.
COPY public.member (id, display_name, phone) FROM stdin;
347de2af-e58b-44d3-ac6a-971fc7ffa1ec	name1	phone1
0c27a603-43d1-4a77-9c97-82da9c4abf33	name2	phone2
\.
COPY public.sessions (id, "sessionToken", "userId", expires) FROM stdin;
\.
COPY public.verification_tokens (token, identifier, expires) FROM stdin;
\.
