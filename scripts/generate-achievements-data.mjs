import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, 'docs', 'achievements', 'achievements.json');
const MANIFEST = path.join(ROOT, 'docs', 'achievements', 'asset-manifest.json');
const OUTPUT = path.join(ROOT, 'src', 'data', 'achievements.gallery.json');

const inventory = JSON.parse(fs.readFileSync(SOURCE, 'utf8'));
const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
const assets = new Map(manifest.records.map((record) => [record.id, record]));

const CATEGORY_ORDER = [
  'Hackathons',
  'Quizzes',
  'Competitions',
  'Recognition & Awards',
  'Swags & Memorabilia',
];

const CLAIM_TYPES = [
  ['judges', 'Award'],
  ['finalist', 'Finalist'],
  ['completionist', 'Completion'],
  ['certificate of completion', 'Completion'],
  ['physical swag', 'Swag'],
  ['badge', 'Badge'],
];

const STATUS_LABELS = {
  verified_from_document: 'Verified from document',
  verified_from_document_and_url: 'Verified from document and link',
  verified_from_screenshot: 'Screenshot record',
  partial_manual_verification_required: 'Detail pending',
  unverified_badge_or_photo: 'Unverified from file',
};

const CAVEATS = {
  'uai-hawkathon-2026-judges-choice':
    'Award is printed on the certificate. The event date was not printed on the certificate.',
  'aiktc-web-development-bootcamp':
    'Completion is printed on the certificate. The completion date was not printed on the certificate.',
  'hacktoberfest-2026-completionist-plusplus':
    'Highest completion tier. The earlier Completionist certificate is supporting evidence only.',
  'hacktoon-1-finalist': 'Finalist status is printed on the certificate. No event date is printed.',
  'amd-slingshot-ideathon-2026': 'Certificate ID redacted in the public preview and PDF.',
  'omnirush-agentic-buildathon-2026':
    'Verification QR redacted in the public preview and PDF. Team name printed as Team RameezHiro.',
  'ey-techathon-6-round-1':
    'Round 1 only. Verification QR redacted in the public preview and PDF.',
  'uai-hawkathon-finale-2026':
    'The certificate’s result line is blank. This is a finale recognition, not a numbered result.',
  'hacktoberfest-mumbai-hackday-2026': 'Certificate ID redacted in the public preview and PDF.',
  'national-data-science-olympiad-2026': 'Verification QR redacted in the public preview.',
  'quizoff-2026': 'Top social-share banner cropped from the preview.',
  'elite-quiz-5': 'Verification QR redacted in the public preview.',
  'omnikon-foundations-quiz-2026': 'Verification QR redacted in the public preview and PDF.',
  'nationbuilding-online-quiz-2026':
    'Online quiz round only. Verification QR redacted in the public preview and PDF.',
  'hacktoberfest-2025-supercontributor':
    'Screenshot cropped to the badge artwork. Badge ID, account handle and avatar withheld.',
  'solution-challenge-build-with-ai-badge':
    'Generic badge with no printed name, date or edition. Ownership is not verifiable from the file alone.',
  'hacktoberfest-2025-tshirt': 'EXIF metadata removed from the published photo.',
  'matiks-tshirt': 'The qualifying event is not documented. EXIF metadata removed from the photo.',
};

function claimType(achievement) {
  const value = (achievement.achievementType || '').toLowerCase();
  const match = CLAIM_TYPES.find(([needle]) => value.includes(needle));
  return match ? match[1] : 'Participation';
}

function formatDate(value) {
  if (!value || value === 'Not specified') return 'Date not printed';
  if (value.includes(' – ')) {
    return value
      .split(' – ')
      .map((part) => formatDate(part))
      .join(' – ');
  }
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function altText(achievement, type) {
  if (type === 'Swag') return `${achievement.title} — photograph of the item`;
  if (type === 'Badge') return `${achievement.title} — badge artwork`;
  return `${achievement.title} — ${type.toLowerCase()} certificate`;
}

const records = inventory.achievements.map((achievement) => {
  const type = claimType(achievement);
  const asset = assets.get(achievement.id);
  const visible = achievement.portfolioVisible === true;
  const isMissing = visible && (!asset || asset.status === 'missing');

  let assetRecord;
  if (!visible) {
    assetRecord = { status: 'supporting', preview: null, document: null, redacted: false };
  } else if (isMissing) {
    assetRecord = {
      status: 'missing',
      preview: null,
      document: null,
      redacted: false,
      expectedPreview: asset?.expectedPreview ?? null,
      expectedDocument: asset?.expectedDocument ?? null,
    };
  } else {
    assetRecord = {
      status: 'ready',
      preview: asset.preview,
      document: asset.document,
      redacted: asset.redacted === true,
    };
  }

  return {
    id: achievement.id,
    title: achievement.title,
    category: achievement.category,
    organization: achievement.organization,
    event: achievement.event,
    achievementType: achievement.achievementType,
    claimType: type,
    date: achievement.date,
    dateLabel: formatDate(achievement.date),
    position: achievement.position,
    team: achievement.team,
    role: achievement.role,
    description: achievement.description,
    fileName: achievement.fileName,
    source: achievement.source,
    displayOrder: achievement.displayOrder,
    portfolioVisible: visible,
    featured: achievement.featured === true,
    supportingDocument: achievement.supportingDocument === true,
    status: achievement.status,
    statusLabel: STATUS_LABELS[achievement.status] ?? achievement.status,
    privacyFlags: achievement.privacyFlags ?? [],
    caveat: CAVEATS[achievement.id] ?? null,
    alt: assetRecord.preview ? altText(achievement, type) : null,
    asset: assetRecord,
  };
});

const visible = records.filter((record) => record.portfolioVisible);
const supporting = records.filter((record) => !record.portfolioVisible);

const byCategory = Object.fromEntries(CATEGORY_ORDER.map((category) => [category, 0]));
for (const record of visible) {
  byCategory[record.category] += 1;
}

const output = {
  generatedAt: new Date().toISOString().slice(0, 10),
  source: 'docs/achievements/achievements.json',
  note:
    'Sanitised gallery derivative. Verification URLs, certificate IDs, badge IDs, private notes and manual-verification data are intentionally excluded.',
  counts: {
    total: records.length,
    visible: visible.length,
    supporting: supporting.length,
    featured: visible.filter((record) => record.featured).length,
    byCategory,
  },
  categories: CATEGORY_ORDER.map((category) => ({
    name: category,
    count: byCategory[category],
  })),
  achievements: [...visible.sort((a, b) => a.displayOrder - b.displayOrder), ...supporting],
};

const forbidden = [
  'CERTIFICATE-ID-REDACTED',
  'CERTIFICATE-ID-REDACTED',
  'BADGE-ID-REDACTED',
  '@rameezhiro',
  'unstop.com/certificate-preview',
  'POCO F6',
];
const serialised = JSON.stringify(output, null, 2);
for (const value of forbidden) {
  if (serialised.includes(value)) {
    throw new Error(`Refusing to write gallery data: private value detected (${value})`);
  }
}

fs.writeFileSync(OUTPUT, `${serialised}\n`);
console.log(
  `wrote ${path.relative(ROOT, OUTPUT)} — ${output.counts.total} records, ` +
    `${output.counts.visible} visible, ${output.counts.supporting} supporting, ` +
    `${output.counts.featured} featured`,
);
