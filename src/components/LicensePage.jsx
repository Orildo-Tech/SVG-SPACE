import React from 'react';
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ExternalLink,
  Copy,
  Check,
  FileText,
  Award,
  Globe,
  HelpCircle
} from 'lucide-react';

export function LicensePage({ onNavigate }) {
  const [copied, setCopied] = React.useState(false);

  const officialLegalText = `Creative Commons Legal Code

CC0 1.0 Universal

    CREATIVE COMMONS CORPORATION IS NOT A LAW FIRM AND DOES NOT PROVIDE
    LEGAL SERVICES. DISTRIBUTION OF THIS DOCUMENT DOES NOT CREATE AN
    ATTORNEY-CLIENT RELATIONSHIP. CREATIVE COMMONS PROVIDES THIS
    INFORMATION ON AN "AS-IS" BASIS. CREATIVE COMMONS MAKES NO WARRANTIES
    REGARDING THE USE OF THIS DOCUMENT OR THE INFORMATION OR WORKS
    PROVIDED HEREUNDER, AND DISCLAIMS LIABILITY FOR DAMAGES RESULTING FROM
    THE USE OF THIS DOCUMENT OR THE INFORMATION OR WORKS PROVIDED
    HEREUNDER.

Statement of Purpose

The laws of most jurisdictions throughout the world automatically confer
exclusive Copyright and Related Rights (defined below) upon the creator
and subsequent owner(s) (each and all, an "owner") of an original work of
authorship and/or a database (each, a "Work").

Certain owners wish to permanently relinquish those rights to a Work for
the purpose of contributing to a commons of creative, cultural and
scientific works ("Commons") that the public can reliably and without fear
of later claims of infringement build upon, modify, incorporate in other
works, reuse and redistribute as freely as possible in any form whatsoever
and for any purposes, including without limitation commercial purposes.
These owners may contribute to the Commons to promote the ideal of a free
culture and the further production of creative, cultural and scientific
works, or to gain reputation or greater distribution for their Work in
part through the use and efforts of others.

For these and/or other purposes and motivations, and without any
expectation of additional consideration or compensation, the person
associating CC0 with a Work (the "Affirmer"), to the extent that he or she
is an owner of Copyright and Related Rights in the Work, voluntarily
elects to apply CC0 to the Work and publicly distribute the Work under its
terms, with knowledge of his or her Copyright and Related Rights in the
Work and the meaning and intended legal effect of CC0 on those rights.

1. Copyright and Related Rights. A Work made available under CC0 may be
protected by copyright and related or neighboring rights ("Copyright and
Related Rights"). Copyright and Related Rights include, but are not
limited to, the following:

  i. the right to reproduce, adapt, distribute, perform, display,
     communicate, and translate a Work;
 ii. moral rights retained by the original author(s) and/or performer(s);
iii. publicity and privacy rights pertaining to a person's image or
     likeness depicted in a Work;
 iv. rights protecting against unfair competition in regards to a Work,
     subject to the limitations in paragraph 4(a), below;
  v. rights protecting the extraction, dissemination, use and reuse of data
     in a Work;
 vi. database rights (such as those arising under Directive 96/9/EC of the
     European Parliament and of the Council of 11 March 1996 on the legal
     protection of databases, and under any national implementation
     thereof, including any amended or successor version of such
     directive); and
vii. other similar, equivalent or corresponding rights throughout the
     world based on applicable law or treaty, and any national
     implementations thereof.

2. Waiver. To the greatest extent permitted by, but not in contravention
of, applicable law, Affirmer hereby overtly, fully, permanently,
irrevocably and unconditionally waives, abandons, and surrenders all of
Affirmer's Copyright and Related Rights and associated claims and causes
of action, whether now known or unknown (including existing as well as
future claims and causes of action), in the Work (i) in all territories
worldwide, (ii) for the maximum duration provided by applicable law or
treaty (including future time extensions), (iii) in any current or future
medium and for any number of copies, and (iv) for any purpose whatsoever,
including without limitation commercial, advertising or promotional
purposes (the "Waiver"). Affirmer makes the Waiver for the benefit of each
member of the public at large and to the detriment of Affirmer's heirs and
successors, fully intending that such Waiver shall not be subject to
revocation, rescission, cancellation, termination, or any other legal or
equitable action to disrupt the quiet enjoyment of the Work by the public
as contemplated by Affirmer's express Statement of Purpose.

3. Public License Fallback. Should any part of the Waiver for any reason
be judged legally invalid or ineffective under applicable law, then the
Waiver shall be preserved to the maximum extent permitted taking into
account Affirmer's express Statement of Purpose. In addition, to the
extent the Waiver is so judged Affirmer hereby grants to each affected
person a royalty-free, non transferable, non sublicensable, non exclusive,
irrevocable and unconditional license to exercise Affirmer's Copyright and
Related Rights in the Work (i) in all territories worldwide, (ii) for the
maximum duration provided by applicable law or treaty (including future
time extensions), (iii) in any current or future medium and for any number
of copies, and (iv) for any purpose whatsoever, including without
limitation commercial, advertising or promotional purposes (the
"License"). The License shall be deemed effective as of the date CC0 was
applied by Affirmer to the Work. Should any part of the License for any
reason be judged legally invalid or ineffective under applicable law, such
partial invalidity or ineffectiveness shall not invalidate the remainder
of the License, and in such case Affirmer hereby affirms that he or she
will not (i) exercise any of his or her remaining Copyright and Related
Rights in the Work or (ii) assert any associated claims and causes of
action with respect to the Work, in either case contrary to Affirmer's
express Statement of Purpose.

4. Limitations and Disclaimers.

 a. No trademark or patent rights held by Affirmer are waived, abandoned,
    surrendered, licensed or otherwise affected by this document.
 b. Affirmer offers the Work as-is and makes no representations or
    warranties of any kind concerning the Work, express, implied,
    statutory or otherwise, including without limitation warranties of
    title, merchantability, fitness for a particular purpose, non
    infringement, or the absence of latent or other defects, accuracy, or
    the present or absence of errors, whether or not discoverable, all to
    the greatest extent permissible under applicable law.
 c. Affirmer disclaims responsibility for clearing rights of other persons
    that may apply to the Work or any use thereof, including without
    limitation any person's Copyright and Related Rights in the Work.
    Further, Affirmer disclaims responsibility for obtaining any necessary
    consents, permissions or other rights required for any use of the
    Work.
 d. Affirmer understands and acknowledges that Creative Commons is not a
    party to this document and has no duty or obligation with respect to
    this CC0 or use of the Work.`;

  const handleCopyLegalCode = () => {
    navigator.clipboard.writeText(officialLegalText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="md-legal-page-wrapper">
      {/* Header Card */}
      <div className="md-legal-header-card">
        <div className="md-hero-pill-badge badge-subtle-primary" style={{ marginBottom: 12 }}>
          <Scale size={13} />
          <span>Official Legal Code</span>
        </div>
        <h1 className="md-legal-title">Creative Commons Legal Code</h1>
        <p className="md-legal-subtitle">
          CC0 1.0 Universal — Public Domain Dedication for all vector assets hosted on SVG SPACE.
        </p>
      </div>

      {/* Highlights & Plain Language Summary */}
      <div className="md-legal-content-card">
        <div className="md-privacy-highlights-grid">
          <div className="md-privacy-highlight-item">
            <div className="md-privacy-icon-box">
              <Award size={18} />
            </div>
            <h3 className="md-privacy-hl-title">No Copyright Reserved</h3>
            <p className="md-privacy-hl-desc">
              The person who associated a work with this deed has dedicated the work to the public domain by waiving all of his or her rights to the work worldwide under copyright law.
            </p>
          </div>

          <div className="md-privacy-highlight-item">
            <div className="md-privacy-icon-box">
              <Globe size={18} />
            </div>
            <h3 className="md-privacy-hl-title">Free Commercial Use</h3>
            <p className="md-privacy-hl-desc">
              You can copy, modify, distribute and perform the work, even for commercial purposes, all without asking permission or paying any licensing fees.
            </p>
          </div>

          <div className="md-privacy-highlight-item">
            <div className="md-privacy-icon-box">
              <ShieldCheck size={18} />
            </div>
            <h3 className="md-privacy-hl-title">Public License Fallback</h3>
            <p className="md-privacy-hl-desc">
              If the waiver is judged legally ineffective in any jurisdiction, CC0 acts as an unconditional, royalty-free, non-exclusive license to use the work.
            </p>
          </div>
        </div>

        {/* Action Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', paddingBottom: 16, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '13px', color: 'var(--md-sys-color-on-surface-variant)' }}>
              Official Creative Commons Repository Source:
            </span>
            <a
              href="https://creativecommons.org/publicdomain/zero/1.0/legalcode"
              target="_blank"
              rel="noopener noreferrer"
              className="md-btn md-btn-secondary"
              style={{ padding: '4px 10px', fontSize: '12px', height: 'auto' }}
            >
              <span>creativecommons.org</span>
              <ExternalLink size={12} />
            </a>
          </div>

          <button
            type="button"
            className="md-btn md-btn-secondary"
            onClick={handleCopyLegalCode}
            style={{ padding: '6px 14px', fontSize: '12px', height: 'auto' }}
          >
            {copied ? <Check size={13} style={{ color: '#10B981' }} /> : <Copy size={13} />}
            <span>{copied ? 'Copied Legal Code!' : 'Copy Legal Text'}</span>
          </button>
        </div>

        {/* Full Verbatim Legal Code Box */}
        <section className="md-legal-section" style={{ marginTop: 16 }}>
          <h2>Verbatim Legal Code</h2>
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '20px',
              overflowX: 'auto',
              maxHeight: '650px',
              overflowY: 'auto',
              boxSizing: 'border-box'
            }}
          >
            <pre
              style={{
                fontFamily: 'var(--md-font-mono, monospace)',
                fontSize: '12.5px',
                lineHeight: 1.6,
                color: 'var(--md-sys-color-on-surface)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                margin: 0
              }}
            >
              {officialLegalText}
            </pre>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="md-legal-footer-row" style={{ marginTop: 24 }}>
          <button
            type="button"
            className="md-btn md-btn-primary"
            onClick={() => onNavigate?.('submit')}
          >
            <ArrowLeft size={14} />
            <span>Back to Submit Icon</span>
          </button>

          <button
            type="button"
            className="md-btn md-btn-secondary"
            onClick={() => onNavigate?.('icons')}
            style={{ marginLeft: 10 }}
          >
            <span>Explore All Icons</span>
          </button>

          <a
            href="https://creativecommons.org/publicdomain/zero/1.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="md-btn md-btn-secondary"
            style={{ marginLeft: 'auto' }}
          >
            <ExternalLink size={14} />
            <span>Creative Commons CC0 Deed</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LicensePage;
