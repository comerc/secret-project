SET check_function_bodies = false;
CREATE TABLE public.attachments (
    id text NOT NULL,
    "idCard" text,
    bytes numeric,
    date timestamp with time zone,
    "edgeColor" text,
    "idMember" text,
    "isUpload" boolean,
    "mimeType" text,
    name text,
    url text,
    pos numeric,
    "fileName" text
);
CREATE TABLE public."boardBackgrounds" (
    id text NOT NULL,
    brightness text,
    "bottomColor" text,
    "topColor" text,
    "fullSizeUrl" text,
    tile boolean,
    type text,
    attribution jsonb,
    color text,
    emoji text
);
CREATE TABLE public."boardPrefs" (
    id text NOT NULL,
    "permissionLevel" text,
    "hideVotes" boolean,
    voting text,
    comments text,
    invitations text,
    "selfJoin" boolean,
    "cardCovers" boolean,
    "isTemplate" boolean,
    "cardAging" text,
    "calendarFeedEnabled" boolean,
    background text,
    "backgroundColor" text,
    "backgroundImage" text,
    "backgroundTile" boolean,
    "backgroundBrightness" text,
    "backgroundBottomColor" text,
    "backgroundTopColor" text,
    "canBePublic" boolean,
    "canBeOrg" boolean,
    "canBePrivate" boolean,
    "canInvite" boolean
);
CREATE TABLE public."boardStars" (
    "idBoard" text,
    pos numeric,
    id text NOT NULL,
    "idMember" text
);
CREATE TABLE public.boards (
    id text NOT NULL,
    name text,
    "desc" text,
    closed boolean,
    "idOrganization" text,
    pinned boolean,
    url text,
    "shortUrl" text,
    "dateClosed" timestamp with time zone,
    "idMemberCreator" text
);
CREATE TABLE public."cardBadges" (
    id text NOT NULL,
    location boolean,
    votes numeric,
    "viewingMemberVoted" boolean,
    subscribed boolean,
    "dueComplete" boolean,
    due timestamp with time zone,
    description boolean,
    attachments numeric,
    comments numeric,
    "checkItemsChecked" numeric,
    "checkItems" numeric,
    fogbugz text,
    "checkItemsEarliestdue" timestamp with time zone,
    start timestamp with time zone
);
CREATE TABLE public."cardCovers" (
    id text NOT NULL,
    "idAttachment" text,
    color text,
    size text,
    brightness text
);
CREATE TABLE public."cardLabels" (
    id text NOT NULL,
    "idLabel" text
);
CREATE TABLE public."cardMembers" (
    id text NOT NULL,
    "idMember" text
);
CREATE TABLE public."cardMembersVoted" (
    id text NOT NULL,
    "idMember" text
);
CREATE TABLE public.cards (
    id text NOT NULL,
    closed boolean,
    "dueComplete" boolean,
    "dateLastActivity" timestamp with time zone,
    "desc" text,
    due timestamp with time zone,
    "dueReminder" numeric,
    email text,
    "idBoard" text,
    "idList" text,
    "idShort" numeric,
    "manualCoverAttachment" boolean,
    name text,
    pos numeric,
    "shortLink" text,
    "shortUrl" text,
    start timestamp with time zone,
    subscribed boolean,
    url text,
    "isTemplate" boolean
);
CREATE TABLE public."checkItems" (
    id text NOT NULL,
    name text,
    pos numeric,
    state text,
    due timestamp with time zone,
    "dueReminder" numeric,
    "idChecklist" text
);
CREATE TABLE public.checklists (
    id text NOT NULL,
    name text,
    "idCard" text,
    pos numeric
);
CREATE TABLE public."customBoardBackgrounds" (
    id text NOT NULL,
    "idMember" text,
    brightness text,
    "bottomColor" text,
    "topColor" text,
    "fullSizeUrl" text,
    tile boolean,
    type text
);
CREATE TABLE public."customEmojis" (
    id text NOT NULL,
    "idMember" text,
    url text,
    name text
);
CREATE TABLE public."customStickers" (
    id text NOT NULL,
    "idMember" text,
    url text
);
CREATE TABLE public.labels (
    id text NOT NULL,
    "idBoard" text,
    name text,
    color text
);
CREATE TABLE public.lists (
    id text NOT NULL,
    name text,
    closed boolean,
    "idBoard" text,
    pos numeric,
    subscribed boolean,
    "softLimit" text
);
CREATE TABLE public.memberships (
    id text NOT NULL,
    "idMember" text,
    "idBoard" text,
    "memberType" text,
    unconfirmed boolean,
    deactivated boolean
);
CREATE TABLE public.organizations (
    id text NOT NULL,
    "creationMethod" text,
    name text,
    "displayName" text,
    "desc" text,
    "idMemberCreator" text,
    invited boolean,
    "membersCount" numeric,
    "billableMemberCount" numeric,
    "billableCollaboratorCount" numeric,
    url text,
    website text,
    "logoHash" text,
    "logoUrl" text,
    "premiumFeatures" jsonb,
    "ixUpdate" text,
    "dateLastActivity" timestamp with time zone
);
CREATE VIEW public."memberOrganizations" AS
 SELECT o.id,
    o."creationMethod",
    o.name,
    o."displayName",
    o."desc",
    o."idMemberCreator",
    o.invited,
    o."membersCount",
    o."billableMemberCount",
    o."billableCollaboratorCount",
    o.url,
    o.website,
    o."logoHash",
    o."logoUrl",
    o."premiumFeatures",
    o."ixUpdate",
    o."dateLastActivity",
    m."idMember"
   FROM public.memberships m,
    public.boards b,
    public.organizations o
  WHERE ((m."idBoard" = b.id) AND (b."idOrganization" = o.id));
CREATE TABLE public."memberPrefs" (
    id text NOT NULL,
    locale text,
    "colorBlind" boolean,
    "minutesBeforeDeadlineToNotify" numeric,
    "minutesBetweenSummaries" numeric,
    "sendSummaries" boolean
);
CREATE TABLE public.members (
    id text NOT NULL,
    "activityBlocked" boolean,
    "avatarHash" text,
    "avatarUrl" text,
    bio text,
    confirmed boolean,
    "fullName" text,
    "idMemberReferrer" text,
    initials text,
    "memberType" text,
    "nonPublicAvailable" boolean,
    url text,
    username text,
    status text,
    "avatarSource" text,
    "credentialsRemovedCount" numeric,
    email text,
    "gravatarHash" text,
    "loginTypes" jsonb,
    "oneTimeMessagesDismissed" jsonb,
    "uploadedAvatarHash" text,
    "uploadedAvatarUrl" text,
    "premiumFeatures" jsonb,
    "ixUpdate" text
);
CREATE TABLE public.notifications (
    id text NOT NULL,
    "idCard" text,
    unread boolean,
    type text,
    date timestamp with time zone,
    "dateRead" timestamp with time zone,
    data text,
    "idMemberCreator" text,
    "idAction" text
);
CREATE VIEW public."organizationMemberships" AS
 SELECT m.id,
    m."idMember",
    m."memberType",
    m.unconfirmed,
    m.deactivated,
    b."idOrganization"
   FROM public.memberships m,
    public.boards b
  WHERE (m."idBoard" = b.id);
CREATE TABLE public."organizationPrefs" (
    id text NOT NULL,
    "permissionLevel" text,
    "boardInviteRestrict" text,
    "externalMembersDisabled" boolean,
    "associatedDomain" text,
    "googleAppsVersion" numeric
);
CREATE TABLE public."savedSearches" (
    id text NOT NULL,
    "idMember" text,
    name text,
    query text,
    pos text
);
CREATE TABLE public.stickers (
    id text NOT NULL,
    "idCard" text,
    top numeric,
    "left" numeric,
    "zIndex" numeric,
    rotate numeric,
    image text,
    "imageUrl" text
);
CREATE TABLE public."tokenPermissions" (
    id text NOT NULL,
    "idModel" text,
    "modelType" text,
    read boolean,
    write boolean
);
CREATE TABLE public.tokens (
    id text NOT NULL,
    identifier text,
    "idMember" text,
    "dateCreated" timestamp with time zone,
    "dateExpires" timestamp with time zone
);
ALTER TABLE ONLY public.attachments
    ADD CONSTRAINT attachments_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."boardBackgrounds"
    ADD CONSTRAINT "boardBackgrounds_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."boardPrefs"
    ADD CONSTRAINT "boardPrefs_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."boardStars"
    ADD CONSTRAINT "boardStars_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."cardBadges"
    ADD CONSTRAINT "cardBadges_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."cardCovers"
    ADD CONSTRAINT "cardCovers_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."cardLabels"
    ADD CONSTRAINT "cardLabels_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."cardMembersVoted"
    ADD CONSTRAINT "cardMembersVoted_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."cardMembers"
    ADD CONSTRAINT "cardMembers_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."checkItems"
    ADD CONSTRAINT "checkItems_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.checklists
    ADD CONSTRAINT checklists_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."customBoardBackgrounds"
    ADD CONSTRAINT "customBoardBackgrounds_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."customEmojis"
    ADD CONSTRAINT "customEmojis_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."customStickers"
    ADD CONSTRAINT "customStickers_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.lists
    ADD CONSTRAINT lists_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."memberPrefs"
    ADD CONSTRAINT "memberPrefs_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.memberships
    ADD CONSTRAINT memberships_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."organizationPrefs"
    ADD CONSTRAINT "organizationPrefs_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."savedSearches"
    ADD CONSTRAINT "savedSearches_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.stickers
    ADD CONSTRAINT stickers_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."tokenPermissions"
    ADD CONSTRAINT "tokenPermissions_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (id);
