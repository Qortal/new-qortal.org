import { legacyMspHomepageArchive } from "./mspLegacyArchive";

export type FeatureStoryId =
  | "store-sync"
  | "share-collaborate"
  | "communicate"
  | "publish-resilience";

type ArchiveReplacementDetail =
  (typeof legacyMspHomepageArchive.replacementDetails)[number];
type ArchiveMatrixSection =
  (typeof legacyMspHomepageArchive.fullFeatureMatrix)[number];
type ArchiveDiveKey =
  keyof typeof legacyMspHomepageArchive.capabilityDiveContent;

export interface FeatureStoryDetail {
  id: FeatureStoryId;
  kicker: string;
  title: string;
  summary: string;
  supportCopy: string;
  replaceSummary: string[];
  archivedSections: ArchiveReplacementDetail[];
  includedCapabilities: ArchiveMatrixSection[];
  capabilitySections: Array<{
    title: string;
    points: readonly string[];
  }>;
}

function getArchivedSection(id: ArchiveReplacementDetail["id"]) {
  const entry = legacyMspHomepageArchive.replacementDetails.find(
    (section) => section.id === id,
  );

  if (!entry) {
    throw new Error(`Missing archived replacement detail for "${id}"`);
  }

  return entry;
}

function getMatrixSection(id: ArchiveMatrixSection["id"]) {
  const entry = legacyMspHomepageArchive.fullFeatureMatrix.find(
    (section) => section.id === id,
  );

  if (!entry) {
    throw new Error(`Missing archived feature matrix section for "${id}"`);
  }

  return entry;
}

function getCapabilitySection(id: ArchiveDiveKey) {
  return legacyMspHomepageArchive.capabilityDiveContent[id];
}

export const featureStoryDetails: Record<FeatureStoryId, FeatureStoryDetail> = {
  "store-sync": {
    id: "store-sync",
    kicker: "Files, Sync, Sharing, and Backup",
    title: "Store, Sync, Share, and Publish",
    summary:
      "NuQloud keeps your files, sync, sharing, collaboration, and off-network backup options in one private workflow instead of scattering them across separate storage tools.",
    supportCopy:
      "Files, collaboration, controlled sharing, and resilient publishing stay in one managed environment instead of being split across storage, backup, and link-sharing services.",
    replaceSummary: [
      "Dropbox / OneDrive / Box / iCloud Drive",
      "Google Drive / Workspace Files",
      "Add-on backup tooling and public-link patchwork",
    ],
    archivedSections: [
      getArchivedSection("workspace-core"),
      getArchivedSection("office-layer"),
      getArchivedSection("publish-layer"),
    ],
    includedCapabilities: [
      getMatrixSection("core-collaboration"),
      getMatrixSection("office"),
      getMatrixSection("platform-ops"),
    ],
    capabilitySections: [
      getCapabilitySection("distributed_apps"),
      getCapabilitySection("redundancy"),
    ],
  },
  "share-collaborate": {
    id: "share-collaborate",
    kicker: "Shared Workspaces and Coordination",
    title: "Share and Collaborate in One Place",
    summary:
      "NuQloud keeps document work, team coordination, project tracking, and shared knowledge in one private workspace so collaboration does not sprawl across disconnected apps.",
    supportCopy:
      "Document work, shared context, workflow tracking, and team coordination stay attached to the same private cloud instead of being distributed across multiple vendors.",
    replaceSummary: [
      "Google Workspace / Microsoft 365",
      "Notion / Confluence / Airtable",
      "Trello / Asana / Jira",
    ],
    archivedSections: [
      getArchivedSection("office-layer"),
      getArchivedSection("workflow-layer"),
      getArchivedSection("groupware-layer"),
    ],
    includedCapabilities: [
      getMatrixSection("office"),
      getMatrixSection("collaboration-tools"),
      getMatrixSection("groupware"),
    ],
    capabilitySections: [getCapabilitySection("distributed_apps")],
  },
  communicate: {
    id: "communicate",
    kicker: "Messaging, Calls, and Team Context",
    title: "Communicate Without Stack Sprawl",
    summary:
      "NuQloud brings messaging, calls, meeting links, recordings, and team context together so internal and external communication stays in the same private environment.",
    supportCopy:
      "Conversations, calls, scheduling context, and operational visibility remain in one environment so teams can communicate without another app stack.",
    replaceSummary: [
      "Slack / Teams / Zoom",
      "Discord / meeting-link sprawl",
      "Separated scheduling and coordination silos",
    ],
    archivedSections: [
      getArchivedSection("comms-layer"),
      getArchivedSection("groupware-layer"),
      getArchivedSection("security-ops-layer"),
    ],
    includedCapabilities: [
      getMatrixSection("communications"),
      getMatrixSection("groupware"),
      getMatrixSection("security-admin"),
    ],
    capabilitySections: [getCapabilitySection("distributed_apps")],
  },
  "publish-resilience": {
    id: "publish-resilience",
    kicker: "QDN Publishing and Resilience",
    title: "Publish with Off-Network Resilience",
    summary:
      "NuQloud can publish content to QDN for access with or without the cloud, preserve verifiable audit trails, and layer encrypted chunked off-network resilience into the same file workflow.",
    supportCopy:
      "Publishing, backup resilience, and broader off-network access can be part of the same file workflow instead of a separate backup or distribution system.",
    replaceSummary: [
      "Public drive links / expiring shares",
      "Docs portals and static knowledge silos",
      "Centralized publishing platforms",
    ],
    archivedSections: [
      getArchivedSection("publish-layer"),
      getArchivedSection("workspace-core"),
      getArchivedSection("upgrade-model"),
    ],
    includedCapabilities: [
      getMatrixSection("core-collaboration"),
      getMatrixSection("platform-ops"),
      getMatrixSection("security-admin"),
    ],
    capabilitySections: [
      getCapabilitySection("distributed_apps"),
      getCapabilitySection("redundancy"),
    ],
  },
};
