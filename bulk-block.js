// x-bulk-blocker: Safe Bulk Block Script for X (Twitter)
// Usage: Paste into browser console on https://x.com/home. Follow prompts.

// Configurable Settings
const DELAY_MIN = 2000; // Min delay between blocks (ms) - Increase for safety
const DELAY_MAX = 5000; // Max delay (ms)
const LOAD_WAIT = 4000; // Wait for profile load (ms)
const CLICK_WAIT = 600; // Wait between clicks (ms)

// Helper: Get random delay
function randomDelay() {
  return Math.random() * (DELAY_MAX - DELAY_MIN) + DELAY_MIN;
}

// Wait for element with MutationObserver (SPA-friendly)
function waitForElement(selector, timeout = 12000) {
  return new Promise((resolve, reject) => {
    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el) {
        observer.disconnect();
        resolve(el);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    
    setTimeout(() => {
      observer.disconnect();
      const el = document.querySelector(selector);
      if (el) resolve(el);
      else reject(new Error(`Element ${selector} not found after ${timeout}ms`));
    }, timeout);
  });
}

// Navigate via X's router (SPA-safe)
function navigateTo(urlPath) {
  const event = new CustomEvent('x-router-navigate', { detail: { url: urlPath } });
  window.dispatchEvent(event);
  
  // Fallback: history.pushState
  if (window.location.pathname !== urlPath) {
    history.pushState(null, '', `https://x.com${urlPath}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
}

// Main blocking function
async function blockUser(username) {
  try {
    navigateTo(`/${username}`);
    await waitForElement('[data-testid="userActions"]', LOAD_WAIT);
    
    const menuBtn = document.querySelector('[data-testid="userActions"]');
    if (!menuBtn) throw new Error('Menu button not found');
    
    menuBtn.click();
    await new Promise(r => setTimeout(r, CLICK_WAIT));
    
    const blockBtn = Array.from(document.querySelectorAll('[role="menuitem"]'))
      .find(item => {
        const text = item.textContent.trim();
        return text.includes('Block') && !text.includes('Unblock');
      });

    if (!blockBtn) throw new Error('Block button not found');
    
    blockBtn.click();
    await new Promise(r => setTimeout(r, CLICK_WAIT));
    
    const confirmBtn = await waitForElement('[data-testid="confirmationSheetConfirm"]', 5000);
    if (!confirmBtn) throw new Error('Confirm button not found');
    
    confirmBtn.click();
    await new Promise(r => setTimeout(r, 1500)); // Process time
    
    console.log(`✅ Blocked @${username}`);
    
    // Return to home
    navigateTo('/home');
    await new Promise(r => setTimeout(r, 1000));
  } catch (error) {
    console.error(`❌ Error blocking @${username}: ${error.message}. Skipping.`);
    navigateTo('/home'); // Recover
    await new Promise(r => setTimeout(r, 1000));
  }
}

// Main script entry
(async () => {
  // Prompt for usernames (paste list, one per line)
  const input = prompt('Paste usernames (one per line, no @). Cancel to exit:');
  if (!input) return console.log('Cancelled.');
  
  const usernames = input.split('\n').map(u => u.trim()).filter(u => u);
  if (usernames.length === 0) return console.log('No usernames provided.');
  
  // Prompt for start index (for resuming)
  const startInput = prompt(`Start from index (0-${usernames.length - 1})? Default 0:`, '0');
  let startFrom = parseInt(startInput) || 0;
  if (startFrom >= usernames.length) return console.log('Start index too high.');
  
  console.log(`Blocking ${usernames.length - startFrom} users from index ${startFrom}. Delays: ${DELAY_MIN/1000}-${DELAY_MAX/1000}s.`);
  
  for (let i = startFrom; i < usernames.length; i++) {
    const username = usernames[i].replace(/[@]/g, '');
    console.log(`[${i+1}/${usernames.length}] Navigating to @${username}...`);
    await blockUser(username);
    
    if (i < usernames.length - 1) {
      const delay = randomDelay();
      console.log(`⏳ Waiting ${Math.round(delay/1000)}s before next...`);
      await new Promise(r => setTimeout(r, delay));
    }
  }
  
  console.log('🎉 All done! Check https://x.com/settings/blocked');
})();