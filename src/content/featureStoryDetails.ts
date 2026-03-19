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
      "NuQloud keeps your files available across devices, lets you choose what to sync, supports public or private sharing, and adds optional decentralized publishing in the same private workflow.",
    supportCopy:
      "Files, collaboration, controlled sharing, and optional encrypted decentralized publishing stay in one managed environment instead of being split across separate storage, backup, and link-sharing services.",
    replaceSummary: [
      "Dropbox / Google Drive / Box / iCloud",
      "Google Docs / Notion / Airtable",
      "Public-link and backup patchwork",
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
      "NuQloud keeps document work, coordination, shared editing, and optional decentralized publishing in one private workspace so collaboration does not sprawl across disconnected apps.",
    supportCopy:
      "Document work, shared context, workflow tracking, and coordinated sharing stay attached to the same private cloud instead of being distributed across multiple vendors.",
    replaceSummary: [
      "Google Docs / Notion / Confluence",
      "Trello / Asana / Jira / Airtable",
      "Disconnected client-share workflows",
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
    kicker: "Messaging, Calls, Meetings, and Team Context",
    title: "Communicate Securely and Privately",
    summary:
      "NuQloud brings messaging, calls, meetings, recordings, and team context together so internal and external communication stays in the same private environment.",
    supportCopy:
      "Conversations, calls, scheduling context, and permissions remain in one environment so teams can communicate without another app stack.",
    replaceSummary: [
      "Google Chat / Google Meet / Zoom",
      "Discord and extra communication silos",
      "Meeting-link and scheduling sprawl",
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
    title: "Publish to Decentralized Data Network",
    summary:
      "NuQloud can publish selected files to QDN for access with or without the cloud, using encrypted chunked off-network distribution tied to the same file workflow.",
    supportCopy:
      "Publishing, encrypted chunking, and broader off-network access can be part of the same file workflow instead of a separate backup or distribution system.",
    replaceSummary: [
      "Server-dependent shared links",
      "Centralized document portals",
      "Single-platform publishing flows",
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
