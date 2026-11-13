// Labels for the six kinds of record in the gallery. The tone is deliberate:
// only an award receives the sakura accent. A finalist is honoured but is not
// a win, and participation / completion / badges / swag stay neutral.
export const CLAIM_STYLES = {
  Award: 'border-sakura-text/50 bg-sakura/10 text-sakura-text',
  Finalist: 'border-ink/40 bg-paper text-ink',
  Completion: 'border-ink/25 bg-paper text-ink',
  Participation: 'border-ink/15 bg-paper text-manga-gray',
  Badge: 'border-ink/15 bg-paper text-manga-gray',
  Swag: 'border-ink/15 bg-paper text-manga-gray',
};

export const claimStyle = (claimType) =>
  CLAIM_STYLES[claimType] ?? CLAIM_STYLES.Participation;
