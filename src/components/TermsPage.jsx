import React from 'react';
import {
  Scale,
  FileText,
  CheckCircle2,
  ShieldAlert,
  Award,
  ArrowLeft,
  ExternalLink,
  Globe,
  Database,
  GitBranch,
  Lock,
  Archive,
  AlertTriangle,
  HeartHandshake
} from 'lucide-react';

export function TermsPage({ onNavigate }) {
  return (
    <div className="md-legal-page-wrapper">
      <div className="md-legal-header-card">
        <div className="md-hero-pill-badge badge-subtle-primary" style={{ marginBottom: 12 }}>
          <Scale size={13} />
          <span>Terms, Licensing & Contributor Agreement</span>
        </div>
        <h1 className="md-legal-title">Terms of Service & Public Domain Policy</h1>
        <p className="md-legal-subtitle">
          Open-source architecture, Public Domain (CC0 1.0) dedication, permanent hosting guarantees, and contributor terms.
        </p>
      </div>

      <div className="md-legal-content-card">
        <div className="md-privacy-highlights-grid">
          <div className="md-privacy-highlight-item">
            <div className="md-privacy-icon-box">
              <Award size={18} />
            </div>
            <h3 className="md-privacy-hl-title">Public Domain (CC0 1.0)</h3>
            <p className="md-privacy-hl-desc">
              All vector icons in our catalog are dedicated to the Public Domain under CC0 1.0 Universal for unrestricted commercial and personal use.
            </p>
          </div>

          <div className="md-privacy-highlight-item">
            <div className="md-privacy-icon-box">
              <GitBranch size={18} />
            </div>
            <h3 className="md-privacy-hl-title">Permanent GitHub Mirror</h3>
            <p className="md-privacy-hl-desc">
              All icons, raw SVGs, and catalogs are versioned on GitHub. If this website goes down, the entire library remains accessible forever.
            </p>
          </div>

          <div className="md-privacy-highlight-item">
            <div className="md-privacy-icon-box">
              <Archive size={18} />
            </div>
            <h3 className="md-privacy-hl-title">Irrevocable Catalog</h3>
            <p className="md-privacy-hl-desc">
              Submissions are immutable and permanent. Account deletion or suspension does not delete submitted icons from the open archive.
            </p>
          </div>
        </div>

        <section className="md-legal-section">
          <h2>1. 100% Open-Source Platform & Public Domain Dedication</h2>
          <p>
            <strong>SVG SPACE</strong> (developed and maintained by Orildo) is an entirely free and open-source vector icon hosting, distribution, and design infrastructure platform. The platform codebase, React components, developer utilities, and API endpoints are published under permissive open-source software licenses (MIT / Apache-2.0).
          </p>
          <p>
            <strong>Universal Public Domain License (Creative Commons CC0 1.0 Universal):</strong> All vector assets, SVG graphics, and icon collections hosted in the SVG SPACE public catalog are dedicated to the worldwide Public Domain under the terms of CC0 1.0 Universal. To the maximum extent permitted by applicable law:
          </p>
          <ul>
            <li>You may copy, modify, distribute, display, perform, and commercialize these works without seeking permission, paying royalties, or providing mandatory attribution (though attribution to SVG SPACE or original authors is always appreciated).</li>
            <li>Assets may be embedded directly into software applications, websites, SaaS products, mobile apps, graphic templates, logos, games, and print media.</li>
            <li>No copyright restrictions are retained by SVG SPACE on submitted and cataloged public domain vector files.</li>
          </ul>
        </section>

        <section className="md-legal-section">
          <h2>2. Permanent Hosting & GitHub Failover Guarantee</h2>
          <p>
            SVG SPACE is designed for infinite longevity, web resilience, and zero link rot. We guarantee that every cataloged asset is permanently archived across redundant networks:
          </p>
          <ul>
            <li><strong>Continuous Public Domain CDN:</strong> Icons are served over distributed edge nodes for high-speed sub-millisecond retrieval.</li>
            <li><strong>GitHub Repository Failover:</strong> The entire SVG SPACE catalog, including all raw SVG variants, normalized JSON metadata, and build pipelines, is synchronously mirrored in our public, open-source GitHub repository at <a href="https://github.com/Orildo-Tech/SVG-SPACE" target="_blank" rel="noopener noreferrer" style={{ color: '#FF5F02', textDecoration: 'underline' }}>github.com/Orildo-Tech/SVG-SPACE</a>.</li>
            <li><strong>Site Outage Protection:</strong> If the SVG SPACE domain, web server, or hosting provider ever suffers unexpected downtime, ceases operations, or is temporarily unreachable, all icons, code snippets, and assets will remain permanently preserved, freely clonable, and fully accessible in perpetuity through the GitHub repository.</li>
          </ul>
        </section>

        <section className="md-legal-section">
          <h2>3. Submissions, Immutability & Irrevocable Archive Policy</h2>
          <p>
            To protect developers, organizations, and applications that rely on SVG SPACE as production infrastructure, the SVG SPACE vector catalog operates under strict <strong>immutability and persistence</strong> guarantees:
          </p>
          <ul>
            <li><strong>Irrevocability:</strong> Once a vector icon is submitted, validated, and published into the public catalog, the contribution and Public Domain dedication are permanent, final, and irrevocable.</li>
            <li><strong>Account Deletion or Suspension:</strong> If a contributor's account, session, or connection is subsequently closed, deleted, cancelled, or suspended for any reason, <strong>the user cannot and will not have the power to delete, unpublish, or withdraw their previously submitted icons</strong>. The submitted vector assets will permanently remain in the public catalog, CDN distribution network, and GitHub repository archive.</li>
            <li><strong>Permitted Updates:</strong> Contributors and community members may submit improvements, additional variants (such as dark mode, mono, or wordmark variants), or higher-precision vectors to an existing entry, but existing public domain assets cannot be retroactively destroyed or made proprietary.</li>
          </ul>
        </section>

        <section className="md-legal-section">
          <h2>4. Contributor Warranties & Submission Agreement</h2>
          <p>
            Every user who submits, uploads, or proposes a vector icon to SVG SPACE explicitly enters into a binding contributor agreement and warrants that:
          </p>
          <ul>
            <li><strong>Anti-Infringement & Rights Warranty:</strong> You agree NOT to upload, submit, or distribute any icon, vector graphic, or digital file that you do not own, hold the appropriate license to distribute, or have legitimate authorization to dedicate to the Public Domain.</li>
            <li><strong>Public Domain Dedication:</strong> By clicking submit, you irrevocably dedicate the uploaded vector graphic and all supplied variants to the Public Domain under Creative Commons CC0 1.0 Universal worldwide.</li>
            <li><strong>No Malicious Content:</strong> You agree and certify that submitted files are pure vector markup, sanitized of any malicious code, executable scripts (such as &lt;script&gt; tags, onload handlers, or malicious foreign objects), tracking pixels, or offensive content.</li>
            <li><strong>Indemnification:</strong> You agree to defend, indemnify, and hold harmless SVG SPACE, Orildo, its contributors, and maintainers from and against any third-party claims, liabilities, damages, or expenses arising from your submission of vector assets in violation of third-party copyrights or licenses.</li>
          </ul>
        </section>

        <section className="md-legal-section">
          <h2>5. Brand Logos, Trademarks & Nominative Fair Use</h2>
          <p>
            Certain icons hosted on SVG SPACE represent corporate brands, open-source foundations, digital products, and registered trademarks:
          </p>
          <ul>
            <li><strong>Ownership:</strong> All brand logos, service marks, and trade names remain the exclusive intellectual property and trademarks of their respective owners.</li>
            <li><strong>Nominative Fair Use:</strong> SVG SPACE indexes, organizes, and displays these marks solely for identification, descriptive reference, software documentation, and developer utility under the legal doctrine of nominative fair use.</li>
            <li><strong>No Affiliation or Endorsement:</strong> The inclusion of any trademark or company logo does not imply endorsement, sponsorship, or affiliation with SVG SPACE. Users of trademarked logos are solely responsible for complying with the respective brand owner's official trademark usage guidelines.</li>
          </ul>
        </section>

        <section className="md-legal-section">
          <h2>6. DMCA & Copyright Takedown Procedure</h2>
          <p>
            SVG SPACE strictly respects intellectual property rights. If you are a copyright or trademark owner (or authorized agent) and believe in good faith that any content hosted in our library infringes your copyright or trademark, you may file a notice of infringement.
          </p>
          <p>
            Please submit your request with evidence of ownership, identifying the infringing URL or icon slug:
          </p>
          <ul>
            <li>Via our official GitHub Issues tracker: <a href="https://github.com/Orildo-Tech/SVG-SPACE/issues" target="_blank" rel="noopener noreferrer" style={{ color: '#FF5F02', textDecoration: 'underline' }}>github.com/Orildo-Tech/SVG-SPACE/issues</a></li>
            <li>Via email: <strong>legal@orildo.tech</strong> or <strong>legal@orildo.dev</strong></li>
          </ul>
          <p>
            Verified notices of genuine copyright infringement or trademark violations will be handled and resolved within 24–48 hours.
          </p>
        </section>

        <section className="md-legal-section">
          <h2>7. Disclaimer of Warranties & Limitation of Liability</h2>
          <p>
            SVG SPACE, ITS REPOSITORIES, SERVERS, AND ALL HOSTED ASSETS ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. IN NO EVENT SHALL SVG SPACE, ORILDO, OR ITS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM THE USE OF OR INABILITY TO USE THE SERVICE OR ASSETS.
          </p>
        </section>

        <div className="md-legal-footer-row">
          <button
            type="button"
            className="md-btn md-btn-primary"
            onClick={() => onNavigate?.('icons')}>
            <ArrowLeft size={14} />
            <span>Back to Icon Catalog</span>
          </button>
          <a
            href="https://github.com/Orildo-Tech/SVG-SPACE"
            target="_blank"
            rel="noopener noreferrer"
            className="md-btn md-btn-secondary"
            style={{ marginLeft: 'auto' }}>
            <ExternalLink size={14} />
            <span>View GitHub Repository</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;