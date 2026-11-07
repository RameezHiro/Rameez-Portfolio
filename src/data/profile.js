// Central profile content for Chapter 01 — PROFILE and the site footer.
//
// Destinations are kept here so the chapter and the footer cannot drift apart.
// Any value left as `null` is unavailable and its link is not rendered, rather
// than pointing at a broken or placeholder URL.
//
// `university` is filled from supplied information; `photo` points at the
// portrait in public/images. Setting either to `null` falls back to the
// editorial placeholder treatment.
export const profileData = {
  name: 'Rameez',
  degree: 'B.Tech CSE-AIML',
  university: 'Mumbai University',
  location: 'Mumbai, India',
  academicYear: 'Second Year',

  headline: 'Engineer at the Intersection of Software and AI',
  // Phrase within `headline` that receives the sakura accent colour.
  headlineAccent: 'Software and AI',
  oneLiner:
    'From software systems to intelligent machines, I enjoy turning complex ideas into working solutions.',
  introduction:
    "I'm Rameez, a second-year Computer Science student focused on the intersection of software engineering and artificial intelligence. I enjoy understanding how systems work beneath the surface, building practical solutions, and exploring how intelligent technologies can solve meaningful problems.",

  photo: '/images/profile.jpeg',
  photoAlt: 'Rameez, wearing a black suit, against a white background',
  photoCaption: 'Rameez — profile portrait',

  // GitHub, LinkedIn, email and X destinations already used elsewhere in this
  // portfolio. Resume points at the PDF committed in public/.
  social: {
    github: 'https://github.com/RameezHiro',
    linkedin: 'https://www.linkedin.com/in/shaikh-rameez-17b304336/',
    email: 'yellowvoid22@gmail.com',
    twitter: 'https://x.com/yellow_void22',
    resume: '/resume.pdf',
  },
};

// Four focus areas, in the order presented in the chapter. Icons reuse the
// Lucide-concept marks already shipped in public/icons/tech for Chapter 03.
export const focusAreas = [
  { title: 'Software Engineering', icon: 'lucide-code' },
  { title: 'Artificial Intelligence & Machine Learning', icon: 'lucide-brain' },
  { title: 'Backend Development', icon: 'lucide-layers' },
  { title: 'AI Research', icon: 'lucide-orbit' },
];

// Secondary actions. `null` destinations are filtered out before rendering.
export const socialActions = [
  {
    key: 'github',
    label: 'GitHub',
    icon: 'code',
    ...(profileData.social.github && {
      href: profileData.social.github,
      external: true,
    }),
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: 'link',
    ...(profileData.social.linkedin && {
      href: profileData.social.linkedin,
      external: true,
    }),
  },
  {
    key: 'email',
    label: 'Gmail',
    icon: 'mail',
    ...(profileData.social.email && {
      href: `mailto:${profileData.social.email}`,
      external: false,
    }),
  },
  {
    key: 'twitter',
    label: 'Twitter / X',
    icon: 'tag',
    ...(profileData.social.twitter && {
      href: profileData.social.twitter,
      external: true,
    }),
  },
].filter((action) => action.href);

// Primary call to action. Rendered only when the PDF exists in the public dir.
export const resumeAction = profileData.social.resume
  ? {
      label: 'Resume',
      href: profileData.social.resume,
      note: 'PDF, opens in a new tab',
    }
  : null;

export const profileDetails = [
  { label: 'Name', value: profileData.name },
  { label: 'Degree', value: profileData.degree },
  { label: 'University', value: profileData.university },
  { label: 'Location', value: profileData.location },
  { label: 'Academic year', value: profileData.academicYear },
];
