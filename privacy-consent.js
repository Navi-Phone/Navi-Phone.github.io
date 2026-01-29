/**
 * Privacy Consent Banner for HTML
 * באנר קוקיז והסכמה למדיניות פרטיות
 */

(function() {
  'use strict';

  // ========== הגדרות - ערוך כאן ==========
  const CONFIG = {
    // קישור למדיניות פרטיות שלך - שים את הקישור האמיתי כאן!
    // אם תשאיר ריק ('') השורה לא תופיע
    privacyPolicyUrl: './privacy.html',  // שנה לקישור האמיתי שלך!
    
    // צבע רקע הבאנר (בפורמט HEX)
    bannerColor: '#ffffff',
    
    // טקסטים (ניתן לערוך)
    texts: {
      title: 'קוקיז והעדפות פרטיות',
      description: 'אנחנו משתמשים בקוקיז לצורך הפעלת האתר, מדידה ושיווק.',
      acceptButton: 'מסכים',
      declineButton: 'לא מסכים',
      note: 'ברירת מחדל: רק קוקיז חיוניים. הבחירה נשמרת בדפדפן שלך.',
      privacyText: 'אני מאשר את',
      privacyLinkText: 'מדיניות הפרטיות',
      privacyTextEnd: 'של האתר'
    }
  };
  // ========================================

  const KEY = 'privacyConsent';

  // פונקציות עזר
  const read = () => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || 'null');
    } catch (e) {
      return null;
    }
  };

  const save = (value) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(value));
    } catch (e) {
      console.error('Failed to save consent:', e);
    }
  };

  const granted = (value) => value ? 'granted' : 'denied';

  // עדכון Google Consent Mode v2
  function updateConsent(state) {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        analytics_storage: granted(!!state.analytics),
        ad_storage: granted(!!state.ads),
        ad_user_data: granted(!!state.ads),
        ad_personalization: granted(!!state.ads)
      });
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(['consent', 'update', {
        analytics_storage: granted(!!state.analytics),
        ad_storage: granted(!!state.ads),
        ad_user_data: granted(!!state.ads),
        ad_personalization: granted(!!state.ads)
      }]);
    }
  }

  // יצירת HTML של הבאנר
  function createBanner() {
    // החלת צבע רקע דינמי
    const style = document.createElement('style');
    style.textContent = `:root { --ac-bg: ${CONFIG.bannerColor}; }`;
    document.head.appendChild(style);

    const banner = document.createElement('div');
    banner.id = 'acb-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'true');
    banner.setAttribute('aria-labelledby', 'acb-title');

    // שורת מדיניות פרטיות - תמיד תופיע אם יש קישור!
    let privacyLinkHtml = '';
    if (CONFIG.privacyPolicyUrl && CONFIG.privacyPolicyUrl.trim() !== '') {
      privacyLinkHtml = `
        <p class="acb-privacy-link">
          ${CONFIG.texts.privacyText} 
          <a href="${CONFIG.privacyPolicyUrl}" target="_blank" rel="noopener">
            ${CONFIG.texts.privacyLinkText}
          </a> 
          ${CONFIG.texts.privacyTextEnd}
        </p>
      `;
    }

    banner.innerHTML = `
      <div class="acb-card">
        <h3 id="acb-title" class="acb-title">${CONFIG.texts.title}</h3>
        <p class="acb-text">${CONFIG.texts.description}</p>
        <div class="acb-actions">
          <button type="button" id="acb-accept" class="acb-btn primary">
            ${CONFIG.texts.acceptButton}
          </button>
          <button type="button" id="acb-decline" class="acb-btn secondary">
            ${CONFIG.texts.declineButton}
          </button>
        </div>
        <p class="acb-note">${CONFIG.texts.note}</p>
        ${privacyLinkHtml}
      </div>
    `;

    document.body.appendChild(banner);
    return banner;
  }

  // הצגת הבאנר
  function show(banner) {
    banner.classList.add('show');
  }

  // הסתרת הבאנר
  function hide(banner) {
    banner.classList.remove('show');
  }

  // אתחול Google Consent Mode (ברירת מחדל: denied)
  function initConsentMode() {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted'
    });
  }

  // אתחול ראשי
  function init() {
    // אתחול Consent Mode
    initConsentMode();

    // יצירת הבאנר
    const banner = createBanner();

    // בדיקת הסכמה קיימת
    const consent = read();

    if (!consent) {
      // אין הסכמה - הצג באנר
      show(banner);
      updateConsent({ analytics: false, ads: false });
    } else {
      // יש הסכמה - עדכן הגדרות
      updateConsent(consent);
    }

    // מאזינים לכפתורים
    const acceptBtn = document.getElementById('acb-accept');
    const declineBtn = document.getElementById('acb-decline');

    acceptBtn?.addEventListener('click', () => {
      const state = { analytics: true, ads: true, ts: Date.now() };
      save(state);
      updateConsent(state);
      hide(banner);
    });

    declineBtn?.addEventListener('click', () => {
      const state = { analytics: false, ads: false, ts: Date.now() };
      save(state);
      updateConsent(state);
      hide(banner);
    });
  }

  // הפעלה כשהדף נטען
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
