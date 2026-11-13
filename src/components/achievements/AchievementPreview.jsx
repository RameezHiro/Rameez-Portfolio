import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { claimStyle } from './claimMeta';

const tabClass = (active) =>
  cn(
    'border px-3 py-1.5 font-tech text-[10px] uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura-text',
    active
      ? 'border-ink bg-ink text-paper'
      : 'border-ink/20 text-manga-gray hover:border-ink/60 hover:text-ink'
  );

// Native <dialog> gives focus trapping, Escape handling and focus restoration
// without a second modal implementation. The panel scrolls internally so the
// page never moves behind it.
const AchievementPreview = ({ record, onClose }) => {
  const dialogRef = useRef(null);
  const [view, setView] = useState('preview');
  const isOpen = Boolean(record);

  useEffect(() => {
    setView('preview');
  }, [record?.id]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    const handleClose = () => onClose();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  const close = () => dialogRef.current?.close();

  const handleBackdrop = (event) => {
    if (event.target === dialogRef.current) close();
  };

  const asset = record?.asset ?? null;
  const preview = asset?.preview ?? null;
  const pdfDocument = asset?.document?.kind === 'pdf' ? asset.document : null;
  const isMissing = Boolean(record) && !preview;

  let media = null;

  if (isMissing) {
    media = (
      <div className="flex min-h-[16rem] flex-col items-center justify-center border-b border-ink/15 bg-ink/[0.03] px-6 py-12 text-center md:min-h-[22rem]">
        <p className="font-tech text-[10px] uppercase tracking-[0.24em] text-sakura-text">
          Certificate image pending
        </p>
        <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-manga-gray">
          This record is documented in the achievement inventory, but the
          original image was supplied in chat and was not saved. No substitute
          image is shown.
        </p>
        {asset?.expectedPreview && (
          <p className="mt-4 max-w-full break-all border border-ink/15 bg-paper px-3 py-2 font-tech text-[10px] leading-relaxed text-manga-gray">
            Expected preview: {asset.expectedPreview}
          </p>
        )}
        {asset?.expectedDocument && (
          <p className="mt-2 max-w-full break-all border border-ink/15 bg-paper px-3 py-2 font-tech text-[10px] leading-relaxed text-manga-gray">
            Expected document: {asset.expectedDocument}
          </p>
        )}
      </div>
    );
  } else if (preview && pdfDocument && view === 'document') {
    media = (
      <div className="border-b border-ink/15 bg-ink/[0.04]">
        <iframe
          src={`${pdfDocument.src}#view=FitH`}
          title={`${record.title} — PDF document`}
          className="h-[52svh] w-full border-0 md:h-[62svh]"
        />
        <p className="border-t border-ink/10 px-5 py-2 font-body text-[11px] text-manga-gray md:px-7">
          If the viewer does not load,{' '}
          <a
            href={pdfDocument.src}
            target="_blank"
            rel="noreferrer"
            className="text-ink underline decoration-sakura decoration-2 underline-offset-4 hover:text-sakura-text"
          >
            open the PDF in a new tab
          </a>
          .
        </p>
      </div>
    );
  } else if (preview) {
    media = (
      <div className="flex min-h-[16rem] items-center justify-center border-b border-ink/15 bg-ink/[0.03] px-3 py-3 md:px-6">
        <img
          src={preview.src}
          alt={record.alt ?? `${record.title} certificate`}
          width={preview.width}
          height={preview.height}
          className="max-h-[54svh] w-auto max-w-full object-contain md:max-h-[58svh]"
        />
      </div>
    );
  }

  return (
    <dialog
      ref={dialogRef}
      className="achievement-dialog"
      aria-labelledby={record ? 'achievement-preview-title' : undefined}
      onClick={handleBackdrop}
    >
      {record && (
        <div className="achievement-dialog__panel flex max-h-full w-full max-w-6xl flex-col overflow-hidden border border-ink bg-paper">
          <header className="flex shrink-0 items-start justify-between gap-4 border-b border-ink/15 px-5 py-4 md:px-7">
            <div className="min-w-0">
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-tech text-[10px] uppercase tracking-[0.24em] text-manga-gray">
                <span
                  className={cn(
                    'border px-2 py-0.5 leading-none tracking-[0.18em]',
                    claimStyle(record.claimType)
                  )}
                >
                  {record.claimType}
                </span>
                <span>{record.dateLabel}</span>
              </p>
              <h3
                id="achievement-preview-title"
                className="mt-2 font-display text-lg font-bold leading-snug text-ink md:text-2xl"
              >
                {record.title}
              </h3>
              <p className="mt-1 font-body text-xs leading-relaxed text-manga-gray">
                {record.organization}
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              className="shrink-0 border border-ink/25 px-3 py-2 font-tech text-[10px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink hover:text-sakura-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura-text focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              Close <span aria-hidden="true">✕</span>
            </button>
          </header>

          {(pdfDocument || preview) && (
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-ink/15 px-5 py-2 md:px-7">
              {pdfDocument ? (
                <div
                  role="group"
                  aria-label="Certificate view"
                  className="flex gap-1.5"
                >
                  <button
                    type="button"
                    aria-pressed={view === 'preview'}
                    onClick={() => setView('preview')}
                    className={tabClass(view === 'preview')}
                  >
                    Image
                  </button>
                  <button
                    type="button"
                    aria-pressed={view === 'document'}
                    onClick={() => setView('document')}
                    className={tabClass(view === 'document')}
                  >
                    PDF
                  </button>
                </div>
              ) : (
                <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-manga-gray">
                  Public preview
                </p>
              )}

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {pdfDocument ? (
                  <>
                    <a
                      href={pdfDocument.src}
                      target="_blank"
                      rel="noreferrer"
                      className="font-tech text-[10px] uppercase tracking-[0.18em] text-ink underline decoration-sakura decoration-2 underline-offset-4 hover:text-sakura-text"
                    >
                      Open PDF
                    </a>
                    <a
                      href={pdfDocument.src}
                      download
                      title="Download the public copy"
                      className="font-tech text-[10px] uppercase tracking-[0.18em] text-ink underline decoration-sakura decoration-2 underline-offset-4 hover:text-sakura-text"
                    >
                      Download
                    </a>
                  </>
                ) : preview ? (
                  <a
                    href={preview.src}
                    target="_blank"
                    rel="noreferrer"
                    className="font-tech text-[10px] uppercase tracking-[0.18em] text-ink underline decoration-sakura decoration-2 underline-offset-4 hover:text-sakura-text"
                  >
                    Open image
                  </a>
                ) : null}
              </div>
            </div>
          )}

          <div className="min-h-0 flex-1 overflow-y-auto">
            {media}

            <div className="grid gap-6 px-5 py-5 md:grid-cols-[1fr_16rem] md:gap-10 md:px-7 md:py-6">
              <div>
                <p className="font-body text-sm leading-relaxed text-ink md:text-base">
                  {record.description}
                </p>
                {record.caveat && (
                  <p className="mt-3 border-l-2 border-sakura pl-3 font-body text-xs leading-relaxed text-manga-gray">
                    {record.caveat}
                  </p>
                )}
              </div>

              <dl className="space-y-3">
                <div>
                  <dt className="font-tech text-[10px] uppercase tracking-[0.2em] text-manga-gray">
                    Record
                  </dt>
                  <dd className="mt-1 font-body text-xs leading-relaxed text-ink">
                    {record.claimType}
                  </dd>
                </div>
                <div className="border-t border-ink/10 pt-3">
                  <dt className="font-tech text-[10px] uppercase tracking-[0.2em] text-manga-gray">
                    Issuer
                  </dt>
                  <dd className="mt-1 font-body text-xs leading-relaxed text-ink">
                    {record.organization}
                  </dd>
                </div>
                <div className="border-t border-ink/10 pt-3">
                  <dt className="font-tech text-[10px] uppercase tracking-[0.2em] text-manga-gray">
                    Date
                  </dt>
                  <dd className="mt-1 font-body text-xs leading-relaxed text-ink">
                    {record.dateLabel}
                  </dd>
                </div>
                {record.team && record.team !== 'Not specified' && (
                  <div className="border-t border-ink/10 pt-3">
                    <dt className="font-tech text-[10px] uppercase tracking-[0.2em] text-manga-gray">
                      Team
                    </dt>
                    <dd className="mt-1 font-body text-xs leading-relaxed text-ink">
                      {record.team}
                    </dd>
                  </div>
                )}
                <div className="border-t border-ink/10 pt-3">
                  <dt className="font-tech text-[10px] uppercase tracking-[0.2em] text-manga-gray">
                    Verification
                  </dt>
                  <dd className="mt-1 font-body text-xs leading-relaxed text-ink">
                    {record.statusLabel}
                  </dd>
                </div>
                {asset?.redacted && (
                  <div className="border-t border-ink/10 pt-3">
                    <dt className="font-tech text-[10px] uppercase tracking-[0.2em] text-manga-gray">
                      Privacy
                    </dt>
                    <dd className="mt-1 font-body text-xs leading-relaxed text-ink">
                      Identifiers are redacted in this public copy.
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
};

export default AchievementPreview;
